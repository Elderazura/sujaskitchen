# Suja's Kitchen - Next.js Website

A complete Next.js replica of www.sujaskitchen.com built with modern web technologies.

## 🚀 Quick Start

```bash
cd /Users/azura/sujas-kitchen
npm install
npm run dev
```

Visit: **http://localhost:3000**

## 📁 Project Structure

```
sujas-kitchen/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── our-story/         # Our Story page
│   ├── menu/              # Menu page
│   ├── catering/          # Catering page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/             # React components
│   ├── Navigation.tsx     # Main navigation
│   └── Footer.tsx         # Footer component
├── public/
│   └── images/            # All images from media-library
├── media-library/         # Original images folder
└── scripts/
    └── scrape-website.js  # Website scraper
```

## 🖼️ Images

All images are located in:
- `media-library/` - Original images
- `public/images/` - Images used by the website

## 📄 Pages

1. **Home** (`/`) - Hero section, features, story preview
2. **Our Story** (`/our-story`) - History, founder, philosophy
3. **Menu** (`/menu`) - Complete menu with food images
4. **Catering** (`/catering`) - Catering services and gallery
5. **Contact** (`/contact`) - Contact form and information

## 🎨 Features

- ✅ Responsive design
- ✅ Modern UI with Tailwind CSS
- ✅ Image optimization with Next.js Image
- ✅ TypeScript for type safety
- ✅ All original images integrated

## 🛠️ Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

## 📝 Build for Production

```bash
npm run build
npm start
```

---

**Project Location**: `/Users/azura/sujas-kitchen/`
