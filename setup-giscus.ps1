# setup-giscus.ps1
# Simple PowerShell script to help configure Giscus for the blog

Write-Host ""
Write-Host "╔══════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║       GISCUS SETUP HELPER        ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check for .env file
$envFile = Join-Path $PSScriptRoot ".env"
if (-not (Test-Path $envFile)) {
    $envTemplate = Join-Path $PSScriptRoot ".env.template"
    if (Test-Path $envTemplate) {
        Copy-Item -Path $envTemplate -Destination $envFile
        Write-Host "Created .env file from template" -ForegroundColor Green
    } else {
        Write-Host "Error: .env.template file not found" -ForegroundColor Red
        exit 1
    }
}

Write-Host "To configure Giscus comments, you'll need the following information:" -ForegroundColor Yellow
Write-Host "  1. Your GitHub repository name (username/repo)" -ForegroundColor Yellow
Write-Host "  2. Repository ID (from giscus.app)" -ForegroundColor Yellow
Write-Host "  3. Category name (usually 'Announcements')" -ForegroundColor Yellow
Write-Host "  4. Category ID (from giscus.app)" -ForegroundColor Yellow
Write-Host ""

Write-Host "Visit https://giscus.app/ to get your configuration values" -ForegroundColor Cyan
Write-Host ""

$repo = Read-Host "GitHub Repository (username/repo)"
$repoId = Read-Host "Repository ID"
$category = Read-Host "Category name [Announcements]"
if (-not $category) { $category = "Announcements" }
$categoryId = Read-Host "Category ID"

# Update .env file
$envContent = Get-Content -Path $envFile -Raw
$envContent = $envContent -replace "VITE_GISCUS_REPO=.*", "VITE_GISCUS_REPO=$repo"
$envContent = $envContent -replace "VITE_GISCUS_REPO_ID=.*", "VITE_GISCUS_REPO_ID=$repoId"
$envContent = $envContent -replace "VITE_GISCUS_CATEGORY=.*", "VITE_GISCUS_CATEGORY=$category"
$envContent = $envContent -replace "VITE_GISCUS_CATEGORY_ID=.*", "VITE_GISCUS_CATEGORY_ID=$categoryId"

Set-Content -Path $envFile -Value $envContent

Write-Host ""
Write-Host "Giscus configuration updated in .env file!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Make sure your repository is PUBLIC" -ForegroundColor Yellow
Write-Host "2. Enable 'Discussions' in your repository settings" -ForegroundColor Yellow
Write-Host "3. Install the Giscus app on your repository" -ForegroundColor Yellow
Write-Host "4. Add these same environment variables to your Netlify site" -ForegroundColor Yellow
Write-Host ""

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
