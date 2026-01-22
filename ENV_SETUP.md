# Environment Variables Setup Guide

This guide will help you set up the environment variables needed for Instagram and Google My Business integration.

## Important Security Notes

⚠️ **NEVER commit `.env.local` to version control!**
- The `.env.local` file is already in `.gitignore`
- These credentials are sensitive and must remain secret
- Only share these credentials with trusted team members

## Step 1: Create `.env.local` File

Create a file named `.env.local` in the root directory of your project (same level as `package.json`).

## Step 2: Add Instagram Credentials

You need an Instagram Access Token. Here's how to get it:

### Getting Instagram Access Token

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create or select your app
3. Add "Instagram Graph API" product
4. Generate a User Access Token with these permissions:
   - `instagram_basic`
   - `pages_show_list`
   - `instagram_manage_insights`
5. Exchange for a long-lived token (lasts 60 days)

Add to `.env.local`:
```env
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here
INSTAGRAM_BUSINESS_ID=996752600415231
```

## Step 3: Add Google My Business Credentials

### Getting Google My Business Access Token

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable "Google My Business API"
3. Create OAuth 2.0 credentials
4. Use [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/) to get access token
5. Select scope: `https://www.googleapis.com/auth/business.manage`

Add to `.env.local`:
```env
# Primary Location (Al Quoz - Main)
GOOGLE_MY_BUSINESS_LOCATION_ID=ChIJ5wyu6-JrXz4RVYryjycb8Ds
GOOGLE_MY_BUSINESS_ACCOUNT_ID=3678619018306962180

# Additional Locations (Optional)
GOOGLE_SHARJAH_LOCATION_ID=ChIJFf0gA5VbXz4RK_TJzrpNeI0
GOOGLE_SHARJAH_ACCOUNT_ID=2105393245546867275

GOOGLE_SILICON_LOCATION_ID=ChIJK-FX2vFlXz4RR0AOgbEDHU0
GOOGLE_SILICON_ACCOUNT_ID=3678619018306962180

GOOGLE_ABUDHABI_LOCATION_ID=ChIJLQfkWvBnXj4Rel5tRmA5K98
GOOGLE_ABUDHABI_ACCOUNT_ID=3678619018306962180

GOOGLE_ARJAN_LOCATION_ID=ChIJYTZPViVvXz4R-9TJQT-EI9o
GOOGLE_ARJAN_ACCOUNT_ID=3678619018306962180

# Access Token
GOOGLE_MY_BUSINESS_ACCESS_TOKEN=your_google_access_token_here
```

## Complete `.env.local` Template

Copy this template and fill in your actual values:

```env
# Instagram API Configuration
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here
INSTAGRAM_BUSINESS_ID=996752600415231

# Google My Business API Configuration
# Primary location (Al Quoz - Main)
GOOGLE_MY_BUSINESS_LOCATION_ID=ChIJ5wyu6-JrXz4RVYryjycb8Ds
GOOGLE_MY_BUSINESS_ACCOUNT_ID=3678619018306962180

# Additional locations (optional - for aggregating reviews/media)
# Sharjah
GOOGLE_SHARJAH_LOCATION_ID=ChIJFf0gA5VbXz4RK_TJzrpNeI0
GOOGLE_SHARJAH_ACCOUNT_ID=2105393245546867275

# Silicon Oasis
GOOGLE_SILICON_LOCATION_ID=ChIJK-FX2vFlXz4RR0AOgbEDHU0
GOOGLE_SILICON_ACCOUNT_ID=3678619018306962180

# Abu Dhabi
GOOGLE_ABUDHABI_LOCATION_ID=ChIJLQfkWvBnXj4Rel5tRmA5K98
GOOGLE_ABUDHABI_ACCOUNT_ID=3678619018306962180

# Arjan
GOOGLE_ARJAN_LOCATION_ID=ChIJYTZPViVvXz4R-9TJQT-EI9o
GOOGLE_ARJAN_ACCOUNT_ID=3678619018306962180

# Google My Business Access Token
GOOGLE_MY_BUSINESS_ACCESS_TOKEN=your_google_access_token_here

# Optional: For token refresh (if implementing auto-refresh)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REFRESH_TOKEN=your_google_refresh_token_here
```

## Step 4: Restart Development Server

After creating/updating `.env.local`:

1. Stop your development server (Ctrl+C)
2. Start it again: `npm run dev`
3. Environment variables will be loaded automatically

## How It Works

### Instagram Integration
- Fetches posts from your Instagram Business account
- Displays on the homepage in the Social Feed section
- Caches for 1 hour to reduce API calls

### Google My Business Integration
- **Reviews API**: Aggregates reviews from all configured locations
- **Media API**: Combines photos from all locations
- Displays on homepage in Testimonial Slider and Google Business Gallery
- Caches for 1 hour

### Multiple Locations
The system automatically:
- Fetches data from all configured locations
- Combines reviews/media from all locations
- Sorts by date (newest first)
- Handles errors gracefully (if one location fails, others still work)

## Testing

1. Visit your homepage
2. Check browser console for any errors
3. Verify Instagram feed is showing posts
4. Verify Google reviews are displaying
5. Verify Google Business photos are showing

## Troubleshooting

### Instagram not working
- Verify `INSTAGRAM_ACCESS_TOKEN` is valid and not expired
- Check that `INSTAGRAM_BUSINESS_ID` is correct (996752600415231)
- Ensure token has required permissions

### Google not working
- Verify `GOOGLE_MY_BUSINESS_ACCESS_TOKEN` is valid
- Check location IDs are correct
- Ensure account IDs match the locations
- Verify business is verified on Google

### No data showing
- Check browser console for errors
- Verify environment variables are loaded (restart server)
- Ensure API credentials have proper permissions
- Check that businesses have reviews/photos on Google

## Token Expiration

### Instagram Access Token
- Long-lived tokens expire after 60 days
- You'll need to regenerate the token periodically
- Consider implementing token refresh

### Google Access Token
- Access tokens expire after 1 hour
- For production, implement token refresh using refresh token
- See `GOOGLE_MY_BUSINESS_SETUP.md` for refresh token setup

## Production Deployment

For production (Vercel, Netlify, etc.):

1. Add all environment variables in your hosting platform's dashboard
2. Never commit `.env.local` to git
3. Use platform's environment variable settings
4. Consider using a secrets management service for sensitive data

## Security Checklist

- ✅ `.env.local` is in `.gitignore`
- ✅ Never commit credentials to git
- ✅ Use environment variables, not hardcoded values
- ✅ Rotate tokens periodically
- ✅ Use least privilege permissions
- ✅ Monitor API usage and errors
