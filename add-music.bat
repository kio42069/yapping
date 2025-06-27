@echo off
REM Music Manager Script for Windows
REM Usage: add-music.bat "path\to\your\music\file.mp3"

if "%~1"=="" (
    echo Usage: %0 ^<music-file^>
    echo Example: %0 "C:\Downloads\my-song.mp3"
    exit /b 1
)

set "MUSIC_FILE=%~1"
set "MUSIC_DIR=.\public\music"
set "COMPONENT_FILE=.\src\components\MusicPlayer.jsx"

REM Check if music file exists
if not exist "%MUSIC_FILE%" (
    echo Error: Music file '%MUSIC_FILE%' not found!
    exit /b 1
)

REM Check if component file exists
if not exist "%COMPONENT_FILE%" (
    echo Error: MusicPlayer.jsx not found at %COMPONENT_FILE%!
    exit /b 1
)

REM Get filename
for %%F in ("%MUSIC_FILE%") do set "FILENAME=%%~nxF"

REM Copy file to music directory
echo Copying %FILENAME% to music directory...
copy "%MUSIC_FILE%" "%MUSIC_DIR%\"

if %errorlevel% neq 0 (
    echo Error: Failed to copy file!
    exit /b 1
)

REM Check if file already exists in the array
echo Checking if track is already in the music array...
powershell -Command "if ((Get-Content '%COMPONENT_FILE%' -Raw) -match [regex]::Escape('/music/%FILENAME%')) { exit 1 } else { exit 0 }"

if %errorlevel% equ 1 (
    echo Track '%FILENAME%' is already in the music array!
    echo Done!
    pause
    exit /b 0
)

REM Create a temporary PowerShell script to handle special characters
echo Creating temporary script to handle filename...
echo $content = Get-Content '%COMPONENT_FILE%' -Raw > temp_update.ps1
echo $filename = '%FILENAME%' >> temp_update.ps1
echo $newEntry = "    '/music/" + $filename + "'," >> temp_update.ps1
echo $updated = $content -replace '(\s*// Add your actual music files here)', ($newEntry + [Environment]::NewLine + '    $1') >> temp_update.ps1
echo Set-Content '%COMPONENT_FILE%' -Value $updated -NoNewline >> temp_update.ps1

echo Adding %FILENAME% to musicFiles array...
powershell -ExecutionPolicy Bypass -File temp_update.ps1

if %errorlevel% equ 0 (
    echo Successfully added '%FILENAME%' to the music player!
    echo Your track is ready to play.
    del temp_update.ps1
) else (
    echo Warning: File copied but failed to update MusicPlayer.jsx automatically.
    echo Please manually add '/music/%FILENAME%' to the musicFiles array.
    del temp_update.ps1
)

echo.
pause
