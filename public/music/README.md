# Music Folder

This folder contains the background music for your blog.

## How to add music:

### Option 1: Single Track (Automatic)
Use the provided scripts to automatically copy files and update the music array:

**Windows:**
```cmd
add-music.bat "C:\path\to\your\song.mp3"
```

**Mac/Linux:**
```bash
./add-music.sh ~/path/to/your/song.mp3
```

### Option 2: Bulk Import (Automatic)
Import all music files from a folder:

**Windows:**
```cmd
add-music-folder.bat "C:\path\to\your\music\folder"
```

**Mac/Linux:**
```bash
./add-music-folder.sh ~/path/to/your/music/folder
```

### Option 3: Manual Method
1. **Add your music files** to this `/public/music/` directory
2. **Update the track list** in `/src/components/MusicPlayer.jsx`

## Supported formats:
- MP3, WAV, OGG, M4A, FLAC

## Current setup:

The music player will:
- ✅ Auto-play random tracks from this folder
- ✅ Loop to next random track when current ends  
- ✅ Show mute/unmute and shuffle buttons on all pages
- ✅ Handle browser auto-play restrictions gracefully
- ✅ **NEW**: Automatically update the track list when using scripts

## Manual track list update:

If you add files manually, update the `musicFiles` array in `/src/components/MusicPlayer.jsx`:

```javascript
const musicFiles = [
  '/music/your-track-name.mp3',
  '/music/another-track.mp3',
  // Add more here...
]
```

## Example file structure:
```
public/music/
├── chill-beats.mp3
├── ambient-loop.mp3
├── lo-fi-study.mp3
├── summer-vibes.wav
└── README.md (this file)
```

**Note**: Keep file sizes reasonable for web use (under 10MB per track recommended).
