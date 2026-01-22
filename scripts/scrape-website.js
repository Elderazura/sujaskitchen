const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const BASE_URL = 'https://www.sujaskitchen.com';
const OUTPUT_DIR = path.join(__dirname, '../scraped-data');
const IMAGES_DIR = path.join(__dirname, '../public/images/scraped');

// Ensure directories exist
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

const scrapedData = {
  pages: {},
  images: [],
  navigation: [],
  styles: {}
};

// Download image function
async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const filepath = path.join(IMAGES_DIR, filename);
    
    // Skip if already exists
    if (fs.existsSync(filepath)) {
      console.log(`✓ Image exists: ${filename}`);
      resolve(filepath);
      return;
    }

    protocol.get(url, { timeout: 15000, headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✓ Downloaded: ${filename}`);
          resolve(filepath);
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        downloadImage(response.headers.location, filename).then(resolve).catch(reject);
      } else {
        reject(new Error(`Failed: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      console.error(`✗ Error: ${url} - ${err.message}`);
      reject(err);
    });
  });
}

// Extract images from page
function extractImages($, baseUrl) {
  const images = [];
  $('img').each((i, elem) => {
    let src = $(elem).attr('src') || $(elem).attr('data-src') || $(elem).attr('data-lazy-src') || $(elem).attr('data-original');
    if (src) {
      // Convert relative URLs to absolute
      if (src.startsWith('//')) {
        src = 'https:' + src;
      } else if (src.startsWith('/')) {
        src = baseUrl + src;
      } else if (!src.startsWith('http')) {
        src = baseUrl + '/' + src;
      }
      
      // Skip data URIs and very small images
      if (!src.startsWith('data:') && !src.includes('icon') && !src.includes('logo-small') && !src.includes('1x1')) {
        const alt = $(elem).attr('alt') || '';
        const filename = path.basename(src.split('?')[0]).replace(/[^a-zA-Z0-9.-]/g, '_');
        if (filename && filename.length > 3) {
          images.push({ src, alt, filename, localPath: `/images/scraped/${filename}` });
        }
      }
    }
  });
  return images;
}

// Scrape a single page
async function scrapePage(page) {
  try {
    console.log(`\n📄 Scraping: ${page.url}`);
    const fullUrl = BASE_URL + page.url;
    const response = await axios.get(fullUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 30000
    });
    
    const $ = cheerio.load(response.data);
    
    // Extract title
    const title = $('title').text() || $('h1').first().text();
    
    // Extract meta description
    const metaDescription = $('meta[name="description"]').attr('content') || '';
    
    // Extract main content
    const content = {
      title,
      metaDescription,
      html: '',
      headings: [],
      paragraphs: [],
      images: [],
      links: [],
      navigation: []
    };
    
    // Extract navigation
    $('nav a, .menu a, .navigation a, header a').each((i, elem) => {
      const href = $(elem).attr('href');
      const text = $(elem).text().trim();
      if (href && text && !content.navigation.find(n => n.href === href)) {
        content.navigation.push({ href, text });
      }
    });
    
    // Extract headings
    $('h1, h2, h3, h4, h5, h6').each((i, elem) => {
      content.headings.push({
        level: elem.tagName.toLowerCase(),
        text: $(elem).text().trim(),
        html: $(elem).html()
      });
    });
    
    // Extract paragraphs
    $('p').each((i, elem) => {
      const text = $(elem).text().trim();
      if (text && text.length > 10) {
        content.paragraphs.push({
          text,
          html: $(elem).html()
        });
      }
    });
    
    // Extract main content HTML (preserve structure)
    const mainContent = $('main, .content, .entry-content, article, .post-content').first();
    if (mainContent.length) {
      content.html = mainContent.html();
    } else {
      content.html = $('body').html();
    }
    
    // Extract images
    const images = extractImages($, BASE_URL);
    content.images = images;
    
    // Download images (limit to first 20 per page)
    for (const img of images.slice(0, 20)) {
      try {
        await downloadImage(img.src, img.filename);
        scrapedData.images.push({
          original: img.src,
          local: img.localPath,
          alt: img.alt,
          page: page.name
        });
        await new Promise(resolve => setTimeout(resolve, 500)); // Be polite
      } catch (error) {
        console.error(`  ✗ Failed to download ${img.filename}`);
      }
    }
    
    // Extract links
    $('a').each((i, elem) => {
      const href = $(elem).attr('href');
      const text = $(elem).text().trim();
      if (href && text) {
        content.links.push({ href, text });
      }
    });
    
    scrapedData.pages[page.name] = content;
    
    console.log(`  ✓ Scraped: ${page.name} (${content.headings.length} headings, ${content.paragraphs.length} paragraphs, ${images.length} images)`);
  } catch (error) {
    console.error(`  ✗ Error scraping ${page.url}:`, error.message);
  }
}

// Main scraping function
async function scrape() {
  console.log('🚀 Starting website scrape...\n');
  
  // Pages to scrape - common WordPress/website pages
  const pagesToScrape = [
    { url: '/', name: 'home' },
    { url: '/our-story/', name: 'our-story' },
    { url: '/kerala-traditional-meals-cloud-kitchen/', name: 'menu' },
    { url: '/catering/', name: 'catering' },
    { url: '/contact/', name: 'contact' },
    { url: '/blog/', name: 'blog' },
  ];
  
  for (const page of pagesToScrape) {
    await scrapePage(page);
    // Be polite - wait between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Save scraped data
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'scraped-data.json'),
    JSON.stringify(scrapedData, null, 2)
  );
  
  console.log('\n✅ Scraping complete!');
  console.log(`📁 Data saved to: ${OUTPUT_DIR}/scraped-data.json`);
  console.log(`🖼️  Images saved to: ${IMAGES_DIR}`);
  console.log(`\n📊 Summary:`);
  console.log(`   - Pages scraped: ${Object.keys(scrapedData.pages).length}`);
  console.log(`   - Images downloaded: ${scrapedData.images.length}`);
}

// Run scraper
scrape().catch(console.error);
