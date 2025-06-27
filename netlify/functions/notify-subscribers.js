const fetch = require('node-fetch');
const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const path = require('path');
const fm = require('front-matter');
const marked = require('marked');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function getLatestBlogPost() {
  const blogDir = path.join(__dirname, '../../src/blog');
  const files = fs.readdirSync(blogDir)
    .filter(f => f.endsWith('.md'))
    .map(f => ({
      name: f,
      time: fs.statSync(path.join(blogDir, f)).mtime.getTime()
    }))
    .sort((a, b) => b.time - a.time);
  if (!files.length) return null;
  const latestFile = files[0].name;
  const content = fs.readFileSync(path.join(blogDir, latestFile), 'utf8');
  const { attributes, body } = fm(content);
  return {
    ...attributes,
    slug: latestFile.replace(/\.md$/, ''),
    html: marked.parse(body)
  };
}

// --- Upstash Redis helpers ---
async function getLastSentSlug() {
  const url = `${process.env.UPSTASH_REDIS_REST_URL}/get/last-sent-post-slug`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` }
  });
  const data = await res.json();
  return data.result || null;
}

async function setLastSentSlug(slug) {
  const url = `${process.env.UPSTASH_REDIS_REST_URL}/set/last-sent-post-slug/${slug}`;
  await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` }
  });
}

exports.handler = async function(event, context) {
  const NETLIFY_API_TOKEN = process.env.NETLIFY_API_TOKEN;
  const SITE_ID = process.env.NETLIFY_SITE_ID;

  // Fetch form submissions from Netlify API
  const res = await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}/submissions`, {
    headers: { Authorization: `Bearer ${NETLIFY_API_TOKEN}` }
  });
  const submissions = await res.json();
  const emails = [...new Set(submissions.map(sub => sub.data.email).filter(Boolean))];

  // Get latest blog post
  const post = getLatestBlogPost();
  if (!post) {
    return { statusCode: 200, body: 'No blog posts found.' };
  }

  // Check if this post was already sent (persisted across deploys)
  const lastSentSlug = await getLastSentSlug();
  if (lastSentSlug === post.slug) {
    return { statusCode: 200, body: 'No new post to send.' };
  }

  // Compose styled HTML email
  const html = `
  <body style="background: linear-gradient(45deg, #e6f3ff, #b3d4f7, #f7fafc); font-family: 'VT323', monospace; color: #2d3748; padding: 40px;">
    <div style="max-width: 700px; margin: 0 auto; background: white; border: 2px solid #4a90e2; border-radius: 15px; box-shadow: 0 0 20px rgba(74, 144, 226, 0.2); padding: 30px;">
      <h1 style="color: #2c5282; font-size: 2.5rem; letter-spacing: 2px;">${post.title}</h1>
      <div style="color: #718096; font-size: 1rem; margin-bottom: 20px;">${post.date}</div>
      <div style="margin-bottom: 30px;">
        ${(post.tags || []).map(tag => `<span style='display:inline-block;background:#b3d4f7;color:#2c5282;padding:4px 8px;border-radius:10px;font-size:0.8rem;margin-right:8px;margin-bottom:5px;'>#${tag}</span>`).join(' ')}
      </div>
      <div style="font-size: 1.2rem; line-height: 1.7;">${post.html}</div>
      <div style="margin-top: 40px; text-align: center;">
        <a href="https://your-site.netlify.app/blog/${post.slug}" style="display:inline-block;padding:12px 24px;background:#4a90e2;color:white;border-radius:15px;text-decoration:none;font-size:1.1rem;">Read on the site →</a>
      </div>
    </div>
  </body>
  `;

  const msg = {
    to: emails,
    from: 'your@email.com', // Must be verified in SendGrid
    subject: `New Blog Post: ${post.title}`,
    text: `${post.title}\n${post.date}\nRead: https://your-site.netlify.app/blog/${post.slug}`,
    html,
  };

  if (emails.length > 0) {
    await sgMail.sendMultiple(msg);
    await setLastSentSlug(post.slug);
  }

  return {
    statusCode: 200,
    body: `Notified ${emails.length} subscribers about ${post.slug}`
  };
}; 