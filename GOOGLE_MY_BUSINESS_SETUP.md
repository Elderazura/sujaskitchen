# Google My Business Integration Setup Guide

This guide will help you connect your Google Business Profile (formerly Google My Business) to display real reviews and images on your website.

## Prerequisites

- Google Business Profile account
- Business must be verified on Google
- Google Cloud Platform account
- Access to Google My Business API

## Step 1: Enable Google My Business API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google My Business API**:
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google My Business API"
   - Click "Enable"

## Step 2: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Configure the consent screen if prompted:
   - Choose "External" user type
   - Fill in app information
   - Add scopes: `https://www.googleapis.com/auth/business.manage`
4. Create OAuth client:
   - Application type: "Web application"
   - Authorized redirect URIs: `http://localhost:3000` (for development)
   - Save and note your Client ID and Client Secret

## Step 3: Get Your Location ID

1. Go to [Google Business Profile Manager](https://business.google.com/)
2. Select your business location
3. The Location ID is in the URL: `https://business.google.com/locations/{LOCATION_ID}/dashboard`
4. Or use the API to list locations:
   ```
   GET https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations
   ```

## Step 4: Generate Access Token

### Option A: Using OAuth 2.0 Playground (Easiest)

1. Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Click the gear icon (⚙️) → Check "Use your own OAuth credentials"
3. Enter your Client ID and Client Secret
4. In the left panel, find "Google My Business API v4"
5. Select these scopes:
   - `https://www.googleapis.com/auth/business.manage`
6. Click "Authorize APIs"
7. After authorization, click "Exchange authorization code for tokens"
8. Copy the **Access Token** (this is a short-lived token, ~1 hour)

### Option B: Using Service Account (For Production)

1. Create a Service Account:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service account"
   - Create and download the JSON key file
2. Grant access to your Google Business Profile
3. Use the service account to generate tokens programmatically

### Option C: Long-Lived Token (Recommended)

For production, you'll want to implement token refresh. The access token expires after 1 hour, so you need to:

1. Exchange the authorization code for refresh token
2. Use refresh token to get new access tokens
3. Implement automatic token refresh in your API route

## Step 5: Get Account ID

You need your Google Business Profile Account ID:

1. Use the API to list accounts:
   ```
   GET https://mybusiness.googleapis.com/v4/accounts
   Authorization: Bearer {ACCESS_TOKEN}
   ```
2. Find your account ID in the response

## Step 6: Add Environment Variables

Create or update your `.env.local` file:

```env
# Google My Business API Configuration
GOOGLE_MY_BUSINESS_LOCATION_ID=your_location_id_here
GOOGLE_MY_BUSINESS_ACCOUNT_ID=your_account_id_here
GOOGLE_MY_BUSINESS_ACCESS_TOKEN=your_access_token_here

# Optional: For token refresh
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REFRESH_TOKEN=your_refresh_token_here
```

## Step 7: Test the Integration

1. Restart your development server
2. Visit the homepage - reviews should load automatically
3. Check browser console for any errors
4. Verify reviews are displaying correctly

## API Endpoints Used

### Reviews API
```
GET /v4/accounts/{accountId}/locations/{locationId}/reviews
```

### Media API
```
GET /v4/accounts/{accountId}/locations/{locationId}/media
```

## Token Refresh Implementation

For production, implement automatic token refresh:

```typescript
// app/api/google-token/route.ts
async function refreshAccessToken() {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
      grant_type: 'refresh_token',
    }),
  });
  
  const data = await response.json();
  return data.access_token;
}
```

## Troubleshooting

### Error: "Invalid credentials"
- Verify your access token is valid and not expired
- Check that the token has the correct scopes
- Ensure your business is verified on Google

### Error: "Location not found"
- Verify your Location ID is correct
- Make sure the location is active and verified
- Check that your account has access to this location

### No reviews showing
- Verify your business has reviews on Google
- Check that reviews are public
- Ensure the API has proper permissions

### Token expires frequently
- Implement token refresh mechanism
- Use long-lived tokens or service accounts
- Store tokens securely and refresh automatically

## Rate Limits

Google My Business API has rate limits:
- Default: 300 requests per 100 seconds per user
- Implement caching (already done - 1 hour cache)
- Use pagination for large datasets

## Security Notes

- Never commit `.env.local` to version control
- Store tokens securely
- Use environment variables for all credentials
- Implement proper error handling
- Consider using a secrets management service for production

## Alternative: Using Google Places API

If you prefer a simpler approach, you can use Google Places API:

1. Enable Google Places API in Cloud Console
2. Use Places API to fetch reviews (requires Place ID)
3. Simpler setup but less control over data

## Support

For API issues, refer to:
- [Google My Business API Documentation](https://developers.google.com/my-business/content/overview)
- [API Reference](https://developers.google.com/my-business/reference/rest/v4)
