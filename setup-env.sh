#!/bin/bash

# Setup script for environment variables
# This will create .env.local file with the provided credentials

echo "Setting up environment variables for Suja's Kitchen..."

# Create .env.local file
cat > .env.local << 'EOF'
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
EOF

echo "✅ Created .env.local file"
echo ""
echo "⚠️  IMPORTANT: You need to add your access tokens!"
echo ""
echo "1. Replace 'your_instagram_access_token_here' with your actual Instagram access token"
echo "2. Replace 'your_google_access_token_here' with your actual Google My Business access token"
echo ""
echo "After updating the tokens, restart your development server:"
echo "  npm run dev"
echo ""
