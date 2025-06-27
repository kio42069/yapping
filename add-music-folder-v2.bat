@echo off
REM Bulk Music Import Script for Windows (PowerShell Version)
REM Usage: add-music-folder-v2.bat "C:\path\to\music\folder"

if "%~1"=="" (
    echo Usage: %0 ^<music-folder^>
    echo Example: %0 "C:\Users\YourName\Music"
    echo.
    echo This script will add all MP3, WAV, OGG, M4A, and FLAC files from the specified folder.
    pause
    exit /b 1
)

set "MUSIC_FOLDER=%~1"
set "SCRIPT_DIR=%~dp0"

REM Check if source folder exists
if not exist "%MUSIC_FOLDER%" (
    echo Error: Music folder '%MUSIC_FOLDER%' not found!
    pause
    exit /b 1
)

REM Check if add-music-silent.bat exists
if not exist "%SCRIPT_DIR%add-music-silent.bat" (
    echo Error: add-music-silent.bat script not found in current directory!
    echo Make sure you're running this from the project root directory.
    pause
    exit /b 1
)

echo ====================================
echo Bulk Music Import Tool (PowerShell)
echo ====================================
echo Source folder: %MUSIC_FOLDER%
echo Target: .\public\music\
echo.

REM Use PowerShell to handle the file processing with proper escaping
powershell -ExecutionPolicy Bypass -Command ^
    "$musicFolder = '%MUSIC_FOLDER%'; " ^
    "$scriptPath = '%SCRIPT_DIR%add-music-silent.bat'; " ^
    "$extensions = @('*.mp3', '*.wav', '*.ogg', '*.m4a', '*.flac'); " ^
    "$count = 0; " ^
    "$success = 0; " ^
    "$errors = 0; " ^
    "Write-Host 'Scanning for music files...'; " ^
    "Write-Host ''; " ^
    "foreach ($ext in $extensions) { " ^
    "  $files = Get-ChildItem -Path $musicFolder -Filter $ext -File; " ^
    "  foreach ($file in $files) { " ^
    "    $count++; " ^
    "    Write-Host \"[$count] Adding: $($file.Name)\"; " ^
    "    try { " ^
    "      $psi = New-Object System.Diagnostics.ProcessStartInfo; " ^
    "      $psi.FileName = $scriptPath; " ^
    "      $psi.Arguments = '\"' + $file.FullName + '\"'; " ^
    "      $psi.UseShellExecute = $false; " ^
    "      $psi.CreateNoWindow = $true; " ^
    "      $psi.RedirectStandardOutput = $true; " ^
    "      $psi.RedirectStandardError = $true; " ^
    "      $process = [System.Diagnostics.Process]::Start($psi); " ^
    "      $process.WaitForExit(); " ^
    "      if ($process.ExitCode -eq 0) { " ^
    "        $success++; " ^
    "      } else { " ^
    "        $errors++; " ^
    "        Write-Host \"    ^> Error adding $($file.Name)\"; " ^
    "      } " ^
    "    } catch { " ^
    "      $errors++; " ^
    "      Write-Host \"    ^> Error adding $($file.Name): $($_.Exception.Message)\"; " ^
    "    } " ^
    "    Write-Host ''; " ^
    "  } " ^
    "} " ^
    "Write-Host '===================================='; " ^
    "Write-Host 'Import Complete!'; " ^
    "Write-Host '===================================='; " ^
    "Write-Host \"Total files processed: $count\"; " ^
    "Write-Host \"Successfully added: $success\"; " ^
    "Write-Host \"Errors: $errors\"; " ^
    "Write-Host ''; " ^
    "if ($count -eq 0) { " ^
    "  Write-Host 'No music files found in the specified folder.'; " ^
    "  Write-Host 'Supported formats: MP3, WAV, OGG, M4A, FLAC'; " ^
    "} else { " ^
    "  Write-Host 'All tracks should now be available in your music player!'; " ^
    "}"

echo.
pause
