#!/bin/bash

# Music Manager Script
# Usage: ./add-music.sh path/to/your/music/file.mp3

if [ $# -eq 0 ]; then
    echo "Usage: $0 <music-file>"
    echo "Example: $0 ~/Downloads/my-song.mp3"
    exit 1
fi

MUSIC_FILE="$1"
MUSIC_DIR="./public/music"
COMPONENT_FILE="./src/components/MusicPlayer.jsx"

# Check if music file exists
if [ ! -f "$MUSIC_FILE" ]; then
    echo "Error: Music file '$MUSIC_FILE' not found!"
    exit 1
fi

# Check if component file exists
if [ ! -f "$COMPONENT_FILE" ]; then
    echo "Error: MusicPlayer.jsx not found at $COMPONENT_FILE!"
    exit 1
fi

# Get filename
FILENAME=$(basename "$MUSIC_FILE")

# Copy file to music directory
echo "Copying $FILENAME to music directory..."
cp "$MUSIC_FILE" "$MUSIC_DIR/"

if [ $? -ne 0 ]; then
    echo "Error: Failed to copy file!"
    exit 1
fi

# Check if track already exists in the array
echo "Checking if track is already in the music array..."
if grep -q "/music/$FILENAME" "$COMPONENT_FILE"; then
    echo "Track '$FILENAME' is already in the music array!"
    echo "Done!"
    exit 0
fi

# Add to musicFiles array in MusicPlayer.jsx
echo "Adding $FILENAME to musicFiles array..."
TRACK_ENTRY="    '/music/$FILENAME',"

# Use sed to insert the new track before the comment line
if sed -i "/\/\/ Add your actual music files here/i\\    $TRACK_ENTRY" "$COMPONENT_FILE"; then
    echo "Successfully added '$FILENAME' to the music player!"
    echo "Your track is ready to play."
else
    echo "Warning: File copied but failed to update MusicPlayer.jsx automatically."
    echo "Please manually add '/music/$FILENAME' to the musicFiles array."
fi

echo "Done!"
