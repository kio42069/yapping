@echo off
echo ========================================
echo    Environment Setup
echo ========================================
echo.

echo This will help you set up your Netlify API credentials.
echo.

echo To get your Netlify API token:
echo 1. Go to https://app.netlify.com/user/settings/tokens
echo 2. Click "New access token"
echo 3. Give it a name like "Email Notifications"
echo 4. Copy the token
echo.

echo To get your Site ID:
echo 1. Go to your site in Netlify dashboard
echo 2. Go to Site settings
echo 3. Copy the Site ID (looks like: abc12345-def6-7890-ghij-klmnopqrstuv)
echo.

set /p apiToken="Enter your Netlify API token: "
set /p siteId="Enter your Netlify Site ID: "

echo.
echo Creating .env file...

echo # Netlify API Configuration> .env
echo NETLIFY_API_TOKEN=%apiToken%>> .env
echo NETLIFY_SITE_ID=%siteId%>> .env

echo.
echo ✅ Environment configuration saved to .env file!
echo.
echo Now you can run: npm run sync-subscribers
echo.
pause 