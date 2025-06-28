Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    Email Notification Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "This will help you set up your email configuration." -ForegroundColor Yellow
Write-Host ""

$email = Read-Host "Enter your Gmail address"
$password = Read-Host "Enter your Gmail App Password" -AsSecureString
$passwordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))

Write-Host ""
Write-Host "Creating email-config.json..." -ForegroundColor Green

$config = @{
    email = $email
    password = $passwordPlain
    provider = "gmail"
} | ConvertTo-Json

$config | Out-File -FilePath "email-config.json" -Encoding UTF8

Write-Host ""
Write-Host "✅ Email configuration saved!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Make sure you have 2-factor authentication enabled on Gmail"
Write-Host "2. Generate an App Password (not your regular password)"
Write-Host "3. Run: npm run notify"
Write-Host ""
Read-Host "Press Enter to continue" 