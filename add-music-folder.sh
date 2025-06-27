#!/bin/bash

# Bulk Music Import Script
# Usage: ./add-music-folder.sh /path/to/music/folder
# This script will add all music files from a directory using add-music.sh

if [ $# -eq 0 ]; then
    echo "Usage: $0 <music-folder>"
    echo "Example: $0 ~/Music"
    echo ""
    echo "This script will add all MP3, WAV, OGG, M4A, and FLAC files from the specified folder."
    exit 1
fi

MUSIC_FOLDER="$1"
ADD_MUSIC_SCRIPT="./add-music.sh"

# Check if source folder exists
if [ ! -d "$MUSIC_FOLDER" ]; then
    echo "Error: Music folder '$MUSIC_FOLDER' not found!"
    exit 1
fi

# Check if add-music.sh exists
if [ ! -f "$ADD_MUSIC_SCRIPT" ]; then
    echo "Error: add-music.sh script not found in current directory!"
    echo "Make sure you're running this from the project root directory."
    exit 1
fi

# Make sure add-music.sh is executable
chmod +x "$ADD_MUSIC_SCRIPT"

echo "===================================="
echo "Bulk Music Import Tool"
echo "===================================="
echo "Source folder: $MUSIC_FOLDER"
echo "Target: ./public/music/"
echo ""

COUNT=0
SUCCESS=0
ERRORS=0

echo "Scanning for music files..."
echo ""

# Process all supported music files
for ext in mp3 wav ogg m4a flac MP3 WAV OGG M4A FLAC; do
    for file in "$MUSIC_FOLDER"/*.$ext; do
        # Check if file actually exists (handles case where no files match pattern)
        if [ -f "$file" ]; then
            COUNT=$((COUNT + 1))
            filename=$(basename "$file")
            echo "[$COUNT] Adding: $filename"
            
            if "$ADD_MUSIC_SCRIPT" "$file"; then
                SUCCESS=$((SUCCESS + 1))
            else
                ERRORS=$((ERRORS + 1))
                echo "    > Error adding $filename"
            fi
            echo ""
        fi
    done
done

echo "===================================="
echo "Import Complete!"
echo "===================================="
echo "Total files processed: $COUNT"
echo "Successfully added: $SUCCESS"
echo "Errors: $ERRORS"
echo ""

if [ $COUNT -eq 0 ]; then
    echo "No music files found in the specified folder."
    echo "Supported formats: MP3, WAV, OGG, M4A, FLAC"
else
    echo "Remember to update the musicFiles array in src/components/MusicPlayer.jsx"
    echo "if the add-music.sh script didn't automatically update it."
fi

echo ""
