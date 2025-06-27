const fetch = require('node-fetch');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async function(event, context) {
  const NETLIFY_API_TOKEN = process.env.NETLIFY_API_TOKEN;
  const SITE_ID = process.env.NETLIFY_SITE_ID;

  // Fetch form submissions from Netlify API
  const res = await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}/submissions`, {
    headers: {
      Authorization: `Bearer ${NETLIFY_API_TOKEN}`
    }
  });
  const submissions = await res.json();

  // Get all unique emails
  const emails = [...new Set(submissions.map(sub => sub.data.email).filter(Boolean))];

  // Compose your email
  const msg = {
    to: emails,
    from: 'surat22517@iiitd.ac.in', // Must be verified in SendGrid
    subject: 'New Blog Post!',
    text: 'A new post is live! Check it out at https://your-site.netlify.app/blog',
    html: '<strong>A new post is live! <a href="https://your-site.netlify.app/blog">Read it here</a></strong>',
  };

  // Send the email
  if (emails.length > 0) {
    await sgMail.sendMultiple(msg);
  }

  return {
    statusCode: 200,
    body: `Notified ${emails.length} subscribers`
  };
}; 