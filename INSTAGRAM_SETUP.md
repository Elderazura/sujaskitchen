# Instagram Feed Setup Guide

This guide will help you connect your Instagram account to display real posts on your website.

## Option 1: Instagram Graph API (Recommended for Business/Creator Accounts)

### Prerequisites
- Instagram Business or Creator account
- Facebook Page connected to your Instagram account
- Facebook Developer account

### Step 1: Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Choose "Business" as the app type
4. Fill in app details and create the app

### Step 2: Add Instagram Basic Display Product

1. In your app dashboard, go to "Add Products"
2. Find "Instagram Basic Display" and click "Set Up"
3. Or use "Instagram Graph API" for more features

### Step 3: Configure Instagram Graph API

1. Go to "Products" → "Instagram" → "Basic Display" or "Graph API"
2. Add "Instagram Graph API" product
3. Configure OAuth Redirect URIs:
   - Add: `https://yourdomain.com/auth/instagram/callback`
   - For local testing: `http://localhost:3000/auth/instagram/callback`

### Step 4: Get Your Instagram Business Account ID

1. Go to [Facebook Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your app
3. Get a User Access Token with `instagram_basic`, `pages_show_list`, `instagram_manage_insights` permissions
4. Make a request to: `GET /me/accounts`
5. Find your page and get the Page ID
6. Make a request to: `GET /{page-id}?fields=instagram_business_account`
7. Copy the `instagram_business_account.id` - this is your `INSTAGRAM_BUSINESS_ID`

### Step 5: Generate Long-Lived Access Token

1. In Graph API Explorer, generate a User Access Token with these permissions:
   - `instagram_basic`
   - `pages_show_list`
   - `instagram_manage_insights`
   - `business_management`

2. Exchange for a long-lived token:
   ```
   GET /oauth/access_token?
     grant_type=fb_exchange_token&
     client_id={app-id}&
     client_secret={app-secret}&
     fb_exchange_token={short-lived-token}
   ```

3. Get Page Access Token:
   ```
   GET /{page-id}?fields=access_token&access_token={long-lived-token}
   ```

4. Get Instagram Access Token:
   ```
   GET /{instagram-business-account-id}?fields=access_token&access_token={page-access-token}
   ```

### Step 6: Add Environment Variables

Create or update your `.env.local` file:

```env
INSTAGRAM_ACCESS_TOKEN=your_long_lived_access_token_here
INSTAGRAM_BUSINESS_ID=your_instagram_business_account_id_here
```

### Step 7: Test the API

The feed will automatically fetch posts when you visit the homepage. If there's an error, check:
- Token is valid and not expired
- Business ID is correct
- App has proper permissions

## Option 2: Instagram Basic Display API (Simpler, but Limited)

### Step 1: Create App and Get Credentials
1. Follow steps 1-2 from Option 1
2. Get your App ID and App Secret from app settings

### Step 2: Generate User Token
1. Use the Instagram Basic Display API to get user authorization
2. Exchange authorization code for access token
3. Use this token in `INSTAGRAM_ACCESS_TOKEN`

## Option 3: Third-Party Service (Easiest)

If you prefer not to manage tokens yourself:

1. **Behold.so** - Instagram widget service
2. **SnapWidget** - Instagram feed widgets
3. **NoCodeAPI** - Instagram API wrapper

These services handle token management for you.

## Troubleshooting

### Error: "Invalid OAuth Access Token"
- Token may have expired (long-lived tokens last 60 days)
- Regenerate the token following Step 5

### Error: "Instagram Business ID not found"
- Make sure your Instagram account is a Business or Creator account
- Verify the account is connected to a Facebook Page
- Double-check the Business ID in environment variables

### No Posts Showing
- Check that your Instagram account has public posts
- Verify the API permissions include `instagram_basic`
- Check browser console for detailed error messages

## Notes

- The feed caches for 1 hour to reduce API calls
- Only shows the 12 most recent posts
- Falls back to static images if API fails
- Videos are supported and will display as video elements
