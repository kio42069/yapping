# My Blog

A no-bullshit blog built with Vite + React, because I'm tired of social media BS.

## Why this exists
- Because of the ai generated low quality slop
- Because of the bombardment of personalised ads  
- Because of the absolute shithousery of bot accounts

Dead internet theory be looking pretty real rn.

## What to expect
1. Regular short thoughts / stories
2. Tech/electronics/games posting
3. Rants (definitely rants)
4. Picture dumps (rarely, when I got enough content lol)

## Features
- Blog posts in Markdown
- Giscus comments integration
- Email subscription 
- **Universal music player** with auto-play and shuffle
- Ready for Netlify deployment

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. Build for production:
   ```sh
   npm run build
   ```

## Adding Music 🎵

### Automatic Method (Recommended)
**Single track:**
```cmd
# Windows
add-music.bat "C:\path\to\your\song.mp3"

# Mac/Linux  
./add-music.sh ~/path/to/your/song.mp3
```

**Bulk import from folder:**
```cmd
# Windows
add-music-folder.bat "C:\path\to\your\music\folder"

# Mac/Linux
./add-music-folder.sh ~/path/to/your/music/folder
```

### Manual Method
1. Add music files to `public/music/`
2. Update the `musicFiles` array in `src/components/MusicPlayer.jsx`

**Supported formats:** MP3, WAV, OGG, M4A, FLAC

## Deployment
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- Configured for Netlify with proper routing

## Blog Posts
Add Markdown files to the `blog/` directory.

## Comments
Comments are powered by Giscus (GitHub Discussions).

## Subscriptions
Email subscription ready for Mailchimp/Buttondown integration.

---

Feel free to drop by sometimes to check out what's new.

*bye bye*
