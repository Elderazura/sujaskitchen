# Troubleshooting Guide

## Server Status
- Server is running on port 3000
- Build completes successfully
- No linter errors

## Common Issues

### 1. Images Not Loading
If images aren't showing:
- Check that images are in `public/images/` directory
- Verify image paths in code match actual filenames
- Clear browser cache (Cmd+Shift+R on Mac)

### 2. Page Not Loading
- Make sure server is running: `npm run dev`
- Check browser console for errors (F12)
- Try hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

### 3. Styling Issues
- Check that Tailwind CSS is compiling
- Verify `postcss.config.mjs` uses `@tailwindcss/postcss`

## Quick Fixes

### Restart Server
```bash
cd /Users/azura/sujas-kitchen
pkill -9 node
npm run dev
```

### Check Images
```bash
ls public/images/ | head -10
```

### Check Server Logs
Look for errors in the terminal where `npm run dev` is running

## Test URLs
- Home: http://localhost:3000
- Our Story: http://localhost:3000/our-story
- Menu: http://localhost:3000/menu
- Catering: http://localhost:3000/catering
- Contact: http://localhost:3000/contact
