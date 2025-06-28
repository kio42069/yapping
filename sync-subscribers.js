import dotenv from 'dotenv';
import fs from 'fs';
import fetch from 'node-fetch';

// Load environment variables
dotenv.config();

const SUBSCRIBERS_FILE = 'subscribers.json';

// Netlify configuration
const NETLIFY_CONFIG = {
  apiToken: process.env.NETLIFY_API_TOKEN,
  siteId: process.env.NETLIFY_SITE_ID
};

// Sync subscribers from Netlify forms and save to local file
async function syncSubscribersFromNetlify() {
  if (!NETLIFY_CONFIG.apiToken || !NETLIFY_CONFIG.siteId) {
    console.log('⚠️  Netlify API credentials not found.');
    console.log('Please run setup-netlify.bat first or set NETLIFY_API_TOKEN and NETLIFY_SITE_ID environment variables.');
    return;
  }

  try {
    console.log('📥 Fetching subscribers from Netlify forms...');
    
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
    
    console.log(`✅ Synced ${emails.length} subscribers from Netlify forms to ${SUBSCRIBERS_FILE}`);
    console.log('📝 You can now edit the subscriber list locally if needed.');
  } catch (error) {
    console.error('❌ Error syncing from Netlify:', error.message);
  }
}

// Run the sync
syncSubscribersFromNetlify(); 