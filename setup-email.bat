@echo off
echo ========================================
echo    Email Notification Setup
echo ========================================
echo.

echo This will help you set up your email configuration.
echo.

set /p email="Enter your Gmail address: "
set /p password="Enter your Gmail App Password: "

echo.
echo Creating email-config.json...

echo {> email-config.json
echo   "email": "%email%",>> email-config.json
echo   "password": "%password%",>> email-config.json
echo   "provider": "gmail">> email-config.json
echo }>> email-config.json

echo.
echo ✅ Email configuration saved!
echo.
echo Next steps:
echo 1. Make sure you have 2-factor authentication enabled on Gmail
echo 2. Generate an App Password (not your regular password)
echo 3. Run: npm run notify
echo.
pause 