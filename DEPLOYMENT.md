# Deployment Guide

## ✅ Completed Steps

1. **Mobile & iPad Optimization**
   - Fixed button visibility issues in CTA sections
   - Optimized hero sections for mobile (reduced min-height)
   - Improved font sizes and spacing for mobile devices
   - Added touch-friendly button sizes (44px minimum)
   - Optimized grid layouts for mobile/tablet

2. **Git Repository**
   - Initialized git repository
   - Created initial commit with all files
   - Added remote origin: https://github.com/Elderazura/sujaskitchen.git
   - Branch set to `main`

## 📤 Push to GitHub

The code is ready to push. You may need to authenticate or initialize the GitHub repository first.

### Option 1: Push via Command Line (if authenticated)

```bash
git push -u origin main
```

If you get authentication errors, you may need to:
- Set up a Personal Access Token (GitHub Settings → Developer settings → Personal access tokens)
- Or use SSH instead of HTTPS

### Option 2: Initialize Repository on GitHub First

1. Go to https://github.com/Elderazura/sujaskitchen
2. If the repository is empty, GitHub will show setup instructions
3. Follow the "push an existing repository" instructions

### Option 3: Use GitHub Desktop or VS Code

- Use GitHub Desktop app
- Or use VS Code's built-in Git features

## 🚀 Deploy to Vercel

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up or log in with your GitHub account

### Step 2: Import Project
1. Click "Add New Project"
2. Import from GitHub repository: `Elderazura/sujaskitchen`
3. Vercel will auto-detect Next.js settings

### Step 3: Configure Environment Variables
In Vercel project settings, add these environment variables:

```
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here
INSTAGRAM_BUSINESS_ID=996752600415231

GOOGLE_MY_BUSINESS_LOCATION_ID=ChIJ5wyu6-JrXz4RVYryjycb8Ds
GOOGLE_MY_BUSINESS_ACCOUNT_ID=3678619018306962180

GOOGLE_SHARJAH_LOCATION_ID=ChIJFf0gA5VbXz4RK_TJzrpNeI0
GOOGLE_SHARJAH_ACCOUNT_ID=2105393245546867275

GOOGLE_SILICON_LOCATION_ID=ChIJK-FX2vFlXz4RR0AOgbEDHU0
GOOGLE_SILICON_ACCOUNT_ID=3678619018306962180

GOOGLE_ABUDHABI_LOCATION_ID=ChIJLQfkWvBnXj4Rel5tRmA5K98
GOOGLE_ABUDHABI_ACCOUNT_ID=3678619018306962180

GOOGLE_ARJAN_LOCATION_ID=ChIJYTZPViVvXz4R-9TJQT-EI9o
GOOGLE_ARJAN_ACCOUNT_ID=3678619018306962180

GOOGLE_MY_BUSINESS_ACCESS_TOKEN=your_google_access_token_here
```

### Step 4: Deploy
1. Click "Deploy"
2. Vercel will build and deploy your site
3. You'll get a production URL (e.g., `sujaskitchen.vercel.app`)

### Step 5: Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## 🔧 Build Settings (Auto-detected by Vercel)

- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (auto)
- **Output Directory**: `.next` (auto)
- **Install Command**: `npm install` (auto)
- **Node Version**: 18.x or higher

## 📝 Post-Deployment Checklist

- [ ] Verify site loads correctly
- [ ] Test mobile responsiveness
- [ ] Check Instagram feed loads
- [ ] Verify Google reviews display
- [ ] Test contact form
- [ ] Verify all images load
- [ ] Check navigation on mobile
- [ ] Test all page links

## 🐛 Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Verify Node.js version compatibility
- Check build logs in Vercel dashboard

### Environment Variables Not Working
- Ensure all variables are added in Vercel dashboard
- Redeploy after adding variables
- Check variable names match exactly (case-sensitive)

### Images Not Loading
- Verify image paths are correct
- Check Next.js Image optimization settings
- Ensure images are in `public/images/` directory

## 📱 Mobile Optimization Features

- Responsive hero sections (500px min-height on mobile)
- Touch-friendly buttons (44px minimum)
- Optimized font sizes for mobile
- Mobile-first grid layouts
- Improved spacing and padding
- Fixed button visibility issues

## 🔒 Security Notes

- `.env.local` is in `.gitignore` (not committed)
- Environment variables must be set in Vercel dashboard
- Never commit access tokens to GitHub
- Use Vercel's environment variable encryption
