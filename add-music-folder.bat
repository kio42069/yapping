@echo off
REM Bulk Music Import Script for Windows
REM Usage: add-music-folder.bat "C:\path\to\music\folder"
REM This script will add all music files from a directory using add-music.bat

setlocal EnableDelayedExpansion

if "%~1"=="" (
    echo Usage: %0 ^<music-folder^>
    echo Example: %0 "C:\Users\YourName\Music"
    echo.
    echo This script will add all MP3, WAV, OGG, M4A, and FLAC files from the specified folder.
    pause
    exit /b 1
)

set "MUSIC_FOLDER=%~1"
set "ADD_MUSIC_SCRIPT=add-music.bat"

REM Check if source folder exists
if not exist "%MUSIC_FOLDER%" (
    echo Error: Music folder '%MUSIC_FOLDER%' not found!
    pause
    exit /b 1
)

REM Check if add-music.bat exists
if not exist "%ADD_MUSIC_SCRIPT%" (
    echo Error: add-music.bat script not found in current directory!
    echo Make sure you're running this from the project root directory.
    pause
    exit /b 1
)

echo ====================================
echo Bulk Music Import Tool
echo ====================================
echo Source folder: %MUSIC_FOLDER%
echo Target: .\public\music\
echo.

set /a COUNT=0
set /a SUCCESS=0
set /a ERRORS=0

echo Scanning for music files...
echo.

REM Process MP3 files
for %%f in ("%MUSIC_FOLDER%\*.mp3") do (
    if exist "%%f" (
        set /a COUNT+=1
        echo [!COUNT!] Adding: %%~nxf
        call :AddSingleTrack "%%f"
        echo.
    )
)

REM Process WAV files
for %%f in ("%MUSIC_FOLDER%\*.wav") do (
    if exist "%%f" (
        set /a COUNT+=1
        echo [!COUNT!] Adding: %%~nxf
        call :AddSingleTrack "%%f"
        echo.
    )
)

REM Process OGG files
for %%f in ("%MUSIC_FOLDER%\*.ogg") do (
    if exist "%%f" (
        set /a COUNT+=1
        echo [!COUNT!] Adding: %%~nxf
        call :AddSingleTrack "%%f"
        echo.
    )
)

REM Process M4A files
for %%f in ("%MUSIC_FOLDER%\*.m4a") do (
    if exist "%%f" (
        set /a COUNT+=1
        echo [!COUNT!] Adding: %%~nxf
        call :AddSingleTrack "%%f"
        echo.
    )
)

REM Process FLAC files
for %%f in ("%MUSIC_FOLDER%\*.flac") do (
    if exist "%%f" (
        set /a COUNT+=1
        echo [!COUNT!] Adding: %%~nxf
        call :AddSingleTrack "%%f"
        echo.
    )
)

echo ====================================
echo Import Complete!
echo ====================================
echo Total files processed: !COUNT!
echo Successfully added: !SUCCESS!
echo Errors: !ERRORS!
echo.

if !COUNT! equ 0 (
    echo No music files found in the specified folder.
    echo Supported formats: MP3, WAV, OGG, M4A, FLAC
) else (
    echo Remember to update the musicFiles array in src\components\MusicPlayer.jsx
    echo if the add-music.bat script didn't automatically update it.
)

echo.
pause
goto :EOF

:AddSingleTrack
REM Subroutine to add a single track with proper error handling
set "TRACK_FILE=%~1"
powershell -ExecutionPolicy Bypass -Command ^
    "& { " ^
    "try { " ^
    "  & '%ADD_MUSIC_SCRIPT%' '%TRACK_FILE%' *>$null; " ^
    "  if ($LASTEXITCODE -eq 0) { " ^
    "    $env:SUCCESS = [int]$env:SUCCESS + 1; " ^
    "    exit 0 " ^
    "  } else { " ^
    "    $env:ERRORS = [int]$env:ERRORS + 1; " ^
    "    Write-Host '    > Error adding %~nx1'; " ^
    "    exit 1 " ^
    "  } " ^
    "} catch { " ^
    "  $env:ERRORS = [int]$env:ERRORS + 1; " ^
    "  Write-Host '    > Error adding %~nx1'; " ^
    "  exit 1 " ^
    "} " ^
    "}"

if %errorlevel% equ 0 (
    set /a SUCCESS+=1
) else (
    set /a ERRORS+=1
)
goto :EOF
