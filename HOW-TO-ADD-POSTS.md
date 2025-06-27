# How to Add New Blog Posts

Your blog now automatically detects and loads posts from the `/blog/` directory! 🎉

## ✅ **What's Now Dynamic:**

- **Home page** - Shows 3 most recent posts automatically
- **Blog page** - Shows all posts automatically  
- **Individual post pages** - Load content from markdown files
- **No more hardcoding** - Just add markdown files and they appear!

## 📝 **How to Add a New Post:**

1. **Create a new `.md` file** in the `/blog/` directory
2. **Add frontmatter** at the top:
   ```markdown
   ---
   title: "Your Post Title"
   date: "2025-06-27"
   tags: ["tag1", "tag2"]
   excerpt: "A short description of your post..."
   ---
   
   # Your post content starts here
   
   Write your post content in markdown...
   ```

3. **Save the file** with a descriptive filename (this becomes the URL slug)
4. **Build and deploy** - Your post will automatically appear!

## 📋 **File Naming:**

- File: `my-awesome-post.md` → URL: `/blog/my-awesome-post`
- File: `why-i-love-cats.md` → URL: `/blog/why-i-love-cats`
- Use lowercase, hyphens instead of spaces

## 🏷️ **Frontmatter Fields:**

- **`title`** *(required)*: Post title shown on the site
- **`date`** *(required)*: YYYY-MM-DD format, used for sorting
- **`tags`** *(optional)*: Array of tags for categorization
- **`excerpt`** *(optional)*: Short description, auto-generated if not provided

## 📂 **Current Posts:**

Your blog automatically loads these files:
- `welcome-to-my-blog.md`
- `on-why-i-hate-tracking.md`  
- `just-another-post.md`

## 🔄 **Automatic Features:**

- **Newest posts first** - Automatically sorted by date
- **Automatic excerpts** - Generated from content if not provided
- **Dynamic loading** - No code changes needed for new posts
- **SEO-friendly URLs** - Based on filename

## 🚀 **That's It!**

Just add markdown files to `/blog/` and they'll automatically appear on your site. No more editing JavaScript files! 

**Your blog is now fully dynamic! 📝✨**
