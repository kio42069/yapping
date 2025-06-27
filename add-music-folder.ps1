# Bulk Music Import PowerShell Script
# Usage: .\add-music-folder.ps1 "C:\path\to\music\folder"

param(
    [Parameter(Mandatory=$true)]
    [string]$MusicFolder
)

# Check if source folder exists
if (-not (Test-Path $MusicFolder)) {
    Write-Host "Error: Music folder '$MusicFolder' not found!" -ForegroundColor Red
    exit 1
}

# Check if we're in the right directory
$musicDir = ".\public\music"
$componentFile = ".\src\components\MusicPlayer.jsx"

if (-not (Test-Path $musicDir)) {
    Write-Host "Error: public\music directory not found! Make sure you're running this from the project root." -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $componentFile)) {
    Write-Host "Error: MusicPlayer.jsx not found! Make sure you're running this from the project root." -ForegroundColor Red
    exit 1
}

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Bulk Music Import Tool (PowerShell)" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Source folder: $MusicFolder"
Write-Host "Target: $musicDir"
Write-Host ""

$extensions = @('*.mp3', '*.wav', '*.ogg', '*.m4a', '*.flac')
$count = 0
$success = 0
$errors = 0

Write-Host "Scanning for music files..." -ForegroundColor Yellow
Write-Host ""

# Get the current content of MusicPlayer.jsx
$componentContent = Get-Content $componentFile -Raw

foreach ($ext in $extensions) {
    $files = Get-ChildItem -Path $MusicFolder -Filter $ext -File
    
    foreach ($file in $files) {
        $count++
        Write-Host "[$count] Adding: $($file.Name)" -ForegroundColor Green
        
        try {
            # Copy file to music directory
            $destPath = Join-Path $musicDir $file.Name
            Copy-Item $file.FullName $destPath -Force
            
            # Check if track already exists in the array
            $trackPath = "/music/$($file.Name)"
            if ($componentContent -match [regex]::Escape($trackPath)) {
                Write-Host "    > Track already exists in music array!" -ForegroundColor Yellow
                $success++
            } else {
                # Add to musicFiles array
                $newEntry = "    '$trackPath',"
                $componentContent = $componentContent -replace '(\s*// Add your actual music files here)', ($newEntry + [Environment]::NewLine + '    $1')
                
                Write-Host "    > Added to music array!" -ForegroundColor Green
                $success++
            }
        } catch {
            Write-Host "    > Error adding $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
            $errors++
        }
        Write-Host ""
    }
}

# Save the updated component file
if ($success -gt 0) {
    try {
        Set-Content $componentFile -Value $componentContent -NoNewline -Encoding UTF8
        Write-Host "Updated MusicPlayer.jsx with new tracks!" -ForegroundColor Green
    } catch {
        Write-Host "Warning: Failed to update MusicPlayer.jsx automatically: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Import Complete!" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Total files processed: $count"
Write-Host "Successfully added: $success" -ForegroundColor Green
Write-Host "Errors: $errors" -ForegroundColor $(if ($errors -gt 0) { 'Red' } else { 'Green' })
Write-Host ""

if ($count -eq 0) {
    Write-Host "No music files found in the specified folder." -ForegroundColor Yellow
    Write-Host "Supported formats: MP3, WAV, OGG, M4A, FLAC"
} else {
    Write-Host "All tracks are now available in your music player!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
