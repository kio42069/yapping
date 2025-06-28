# Email Notification System

This local script sends email notifications to subscribers when you publish a new blog post.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure your email settings:**

   ### Option A: Windows Setup (Recommended)
   
   **Using the setup script:**
   ```cmd
   setup-email.bat
   ```
   
   **Or using PowerShell:**
   ```powershell
   .\setup-email.ps1
   ```
   
   **Manual setup:**
   Create `email-config.json` with your credentials:
   ```json
   {
     "email": "your-email@gmail.com",
     "password": "your-app-password",
     "provider": "gmail"
   }
   ```

   ### Option B: Environment variables
   ```bash
   export EMAIL_USER="your-email@gmail.com"
   export EMAIL_PASS="your-app-password"
   ```

3. **Set up Netlify integration (Optional):**
   
   **Using the setup script:**
   ```cmd
   setup-netlify.bat
   ```
   
   **Manual setup:**
   Create `.env` file:
   ```
   NETLIFY_API_TOKEN=your-api-token
   NETLIFY_SITE_ID=your-site-id
   ```

4. **Manage subscribers:**

   **Option A: Sync from Netlify forms (Recommended)**
   ```bash
   npm run sync-subscribers
   ```
   This fetches subscribers from your Netlify forms and saves them to `subscribers.json`
   
   **Option B: Manual management**
   Edit `subscribers.json` directly:
   ```json
   [
     "friend1@example.com",
     "friend2@example.com"
   ]
   ```

5. **Update your site URL:**
   In `notify-subscribers.js`, replace `https://your-site.netlify.app` with your actual site URL.

## Gmail App Password Setup

1. **Enable 2-Factor Authentication:**
   - Go to your Google Account settings
   - Security → 2-Step Verification → Turn it on

2. **Generate App Password:**
   - Go to Security → App passwords
   - Select "Mail" and "Windows Computer"
   - Copy the 16-character password (not your regular Gmail password)

3. **Use the App Password:**
   - Use this 16-character password in your email config
   - Never use your regular Gmail password

## Netlify API Setup

1. **Get your API Token:**
   - Go to https://app.netlify.com/user/settings/tokens
   - Click "New access token"
   - Give it a name like "Email Notifications"
   - Copy the token

2. **Get your Site ID:**
   - Go to your site in Netlify dashboard
   - Go to Site settings
   - Copy the Site ID (looks like: abc12345-def6-7890-ghij-klmnopqrstuv)

## Usage

### Send email notifications:
```bash
npm run notify
```

### Sync subscribers from Netlify forms:
```bash
npm run sync-subscribers
```

### Manual commands:
```bash
node notify-subscribers.js
node sync-subscribers.js
```

## Email Provider Setup

### Gmail (Recommended)
- Host: `smtp.gmail.com`
- Port: `587`
- Requires App Password (not regular password)

### Outlook/Hotmail
Update `email-config.json`:
```json
{
  "email": "your-email@outlook.com",
  "password": "your-password",
  "provider": "outlook"
}
```
And update the host in `notify-subscribers.js` to `smtp-mail.outlook.com`

### Other Providers
Update the `EMAIL_CONFIG` in the script with your provider's SMTP settings.

## Features

- ✅ Automatically detects the latest blog post
- ✅ Prevents duplicate emails (tracks last sent post)
- ✅ Beautiful HTML email template
- ✅ Rate limiting to avoid spam filters
- ✅ Error handling and logging
- ✅ No external service dependencies
- ✅ Easy Windows setup with batch/PowerShell scripts
- ✅ Sync subscribers from Netlify forms to local file
- ✅ Edit subscriber list locally after syncing

## Files

- `notify-subscribers.js` - Main email notification script
- `sync-subscribers.js` - Sync subscribers from Netlify forms
- `subscribers.json` - List of subscriber emails (auto-updated)
- `email-config.json` - Email credentials (auto-generated)
- `last-sent.txt` - Tracks the last sent post (auto-generated)
- `.env` - Netlify API credentials (auto-generated)
- `setup-email.bat` - Windows batch setup script
- `setup-email.ps1` - PowerShell setup script
- `setup-netlify.bat` - Netlify API setup script

## Workflow

1. **Set up email and Netlify credentials** (one-time setup)
2. **Sync subscribers** from Netlify forms: `npm run sync-subscribers`
3. **Edit subscriber list** locally if needed (optional)
4. **Publish new blog post**
5. **Send notifications**: `npm run notify`

## Troubleshooting

- **"Authentication failed"**: 
  - Make sure you're using an App Password, not your regular Gmail password
  - Check that 2-factor authentication is enabled
- **"No blog posts found"**: Make sure your blog posts are in `src/blog/`
- **"No subscribers found"**: Run `npm run sync-subscribers` or add emails to `subscribers.json`
- **"Permission denied"**: Run PowerShell as Administrator if needed
- **"Netlify API error"**: Check your API token and site ID in `.env` file 