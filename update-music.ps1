# update-music.ps1
# This script updates the music array in MusicPlayer.jsx based on the contents of the public/music directory

# Get script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Define paths
$musicPlayerPath = Join-Path $scriptDir "src\components\MusicPlayer.jsx"
$musicDirPath = Join-Path $scriptDir "public\music"

# Check if music directory exists
if (-not (Test-Path $musicDirPath)) {
    Write-Host "Music directory not found at: $musicDirPath" -ForegroundColor Red
    exit 1
}

# Check if MusicPlayer.jsx exists
if (-not (Test-Path $musicPlayerPath)) {
    Write-Host "MusicPlayer.jsx not found at: $musicPlayerPath" -ForegroundColor Red
    exit 1
}

# Get all music files
Write-Host "Scanning music directory..." -ForegroundColor Cyan
$musicFiles = Get-ChildItem -Path $musicDirPath -File | Where-Object { $_.Name -ne "README.md" -and $_.Extension -match '\.(mp3|ogg|wav|flac|m4a)$' }

if ($musicFiles.Count -eq 0) {
    Write-Host "No music files found in $musicDirPath" -ForegroundColor Yellow
    exit 0
}

# Generate the array content with proper formatting
$musicArrayContent = $musicFiles | ForEach-Object {
    "    '/music/$($_.Name)',"
}

# Build the complete array
$newArray = @"
  const musicFiles = [
$($musicArrayContent -join "`n")
  ]
"@

# Read the current file content
$content = Get-Content -Path $musicPlayerPath -Raw

# Find the pattern for the existing music array
$pattern = '(?s)  const\s+musicFiles\s*=\s*\[[^\]]*\]'

# Replace the music array with the new one
$newContent = $content -replace $pattern, $newArray

# Write the updated content back to the file
Set-Content -Path $musicPlayerPath -Value $newContent

# Report success
Write-Host "Successfully updated music array with $($musicFiles.Count) tracks!" -ForegroundColor Green
Write-Host "Music files added:" -ForegroundColor Green
$musicFiles | ForEach-Object {
    Write-Host "  - $($_.Name)" -ForegroundColor Gray
}
