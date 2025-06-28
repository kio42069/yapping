import fs from 'fs';
import path from 'path';
import fm from 'front-matter';
import MarkdownIt from 'markdown-it';
import { createTransport } from 'nodemailer';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const md = new MarkdownIt();

// Configuration
const BLOG_DIR = 'src/blog';
const SUBSCRIBERS_FILE = 'subscribers.json'; // You can maintain this manually or create a simple form

// Netlify configuration (optional - for fetching subscribers from forms)
const NETLIFY_CONFIG = {
  apiToken: process.env.NETLIFY_API_TOKEN,
  siteId: process.env.NETLIFY_SITE_ID
};

// Email configuration - you can use your own email provider
const EMAIL_CONFIG = {
  host: 'smtp.gmail.com', // or your email provider's SMTP
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || getEmailFromConfig() || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || getPasswordFromConfig() || 'your-app-password' // Use app password for Gmail
  }
};

// Load email config from file (easier for Windows users)
function getEmailFromConfig() {
  try {
    if (fs.existsSync('email-config.json')) {
      const config = JSON.parse(fs.readFileSync('email-config.json', 'utf8'));
      return config.email;
    }
  } catch (error) {
    console.error('Error reading email config:', error);
  }
  return null;
}

function getPasswordFromConfig() {
  try {
    if (fs.existsSync('email-config.json')) {
      const config = JSON.parse(fs.readFileSync('email-config.json', 'utf8'));
      return config.password;
    }
  } catch (error) {
    console.error('Error reading email config:', error);
  }
  return null;
}

// Load subscribers from file
function loadSubscribers() {
  try {
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      const data = fs.readFileSync(SUBSCRIBERS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading subscribers:', error);
  }
  return [];
}

// Fetch subscribers from Netlify forms and save to local file
async function syncSubscribersFromNetlify() {
  if (!NETLIFY_CONFIG.apiToken || !NETLIFY_CONFIG.siteId) {
    console.log('⚠️  Netlify API credentials not found. Skipping sync.');
    return false;
  }

  try {
    const response = await fetch(`https://api.netlify.com/api/v1/sites/${NETLIFY_CONFIG.siteId}/submissions`, {
      headers: { 
        Authorization: `Bearer ${NETLIFY_CONFIG.apiToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Netlify API error: ${response.status} ${response.statusText}`);
    }

    const submissions = await response.json();
    const emails = [...new Set(submissions.map(sub => sub.data.email).filter(Boolean))];
    
    // Save to local file
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(emails, null, 2));
    
    console.log(`📥 Synced ${emails.length} subscribers from Netlify forms to ${SUBSCRIBERS_FILE}`);
    return true;
  } catch (error) {
    console.error('❌ Error syncing from Netlify:', error.message);
    return false;
  }
}

// Get the latest blog post
function getLatestBlogPost() {
  try {
    const blogPath = path.join(process.cwd(), BLOG_DIR);
    const files = fs.readdirSync(blogPath)
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const filePath = path.join(blogPath, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          path: filePath,
          mtime: stats.mtime
        };
      })
      .sort((a, b) => b.mtime - a.mtime); // Sort by modification time (newest first)

    if (files.length === 0) {
      console.log('No blog posts found');
      return null;
    }

    const latestFile = files[0];
    const content = fs.readFileSync(latestFile.path, 'utf8');
    
    // Parse frontmatter and markdown
    const { attributes, body } = fm(content);
    return {
      ...attributes,
      slug: latestFile.name.replace(/\.md$/, ''),
      html: md.render(body)
    };
  } catch (error) {
    console.error('Error reading blog post:', error);
    return null;
  }
}

// Check if this post was already sent
function getLastSentSlug() {
  try {
    if (fs.existsSync('last-sent.txt')) {
      return fs.readFileSync('last-sent.txt', 'utf8').trim();
    }
  } catch (error) {
    console.error('Error reading last sent slug:', error);
  }
  return null;
}

function setLastSentSlug(slug) {
  try {
    fs.writeFileSync('last-sent.txt', slug);
  } catch (error) {
    console.error('Error saving last sent slug:', error);
  }
}

// Create email HTML
function createEmailHTML(post) {
  return `
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
}

// Send emails
async function sendEmails(post, subscribers) {
  const transporter = createTransport(EMAIL_CONFIG);
  
  const html = createEmailHTML(post);
  const text = `${post.title}\n${post.date}\nRead: https://your-site.netlify.app/blog/${post.slug}`;

  let successCount = 0;
  let errorCount = 0;

  for (const email of subscribers) {
    try {
      await transporter.sendMail({
        from: EMAIL_CONFIG.auth.user,
        to: email,
        subject: `New Blog Post: ${post.title}`,
        text,
        html
      });
      console.log(`✅ Email sent to: ${email}`);
      successCount++;
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`❌ Failed to send email to ${email}:`, error.message);
      errorCount++;
    }
  }

  return { successCount, errorCount };
}

// Main function
async function main() {
  console.log('📧 Starting email notification process...\n');

  // Sync subscribers from Netlify forms to local file
  await syncSubscribersFromNetlify();
  
  // Load subscribers from local file
  const subscribers = loadSubscribers();
  
  if (subscribers.length === 0) {
    console.log('No subscribers found. Please add emails to subscribers.json or set up Netlify forms.');
    return;
  }
  console.log(`📋 Found ${subscribers.length} subscribers`);

  // Get latest blog post
  const post = getLatestBlogPost();
  if (!post) {
    console.log('No blog posts found');
    return;
  }
  console.log(`📝 Latest post: ${post.title}`);

  // Check if already sent
  const lastSentSlug = getLastSentSlug();
  if (lastSentSlug === post.slug) {
    console.log('This post was already sent to subscribers');
    return;
  }

  // Send emails
  console.log('\n📤 Sending emails...');
  const { successCount, errorCount } = await sendEmails(post, subscribers);

  // Update last sent slug
  if (successCount > 0) {
    setLastSentSlug(post.slug);
  }

  console.log(`\n✅ Process complete!`);
  console.log(`📧 Successfully sent: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
}

// Run the script
main().catch(console.error);

export { main, getLatestBlogPost, loadSubscribers }; 