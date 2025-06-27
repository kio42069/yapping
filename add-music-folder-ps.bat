@echo off
REM Bulk Music Import Script (PowerShell Wrapper)
REM Usage: add-music-folder-ps.bat "C:\path\to\music\folder"

if "%~1"=="" (
    echo Usage: %0 ^<music-folder^>
    echo Example: %0 "C:\Users\YourName\Music"
    echo.
    echo This script will add all MP3, WAV, OGG, M4A, and FLAC files from the specified folder.
    pause
    exit /b 1
)

REM Call the PowerShell script with the provided folder
powershell -ExecutionPolicy Bypass -File "add-music-folder.ps1" "%~1"
