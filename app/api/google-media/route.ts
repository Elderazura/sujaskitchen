import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

interface GoogleMedia {
  mediaFormat: string;
  googleUrl: string;
  thumbnailUrl?: string;
  createTime: string;
  mediaType: string;
}

interface LocationConfig {
  locationId: string;
  accountId: string;
  name?: string;
}

// Get all configured locations
function getLocations(): LocationConfig[] {
  const locations: LocationConfig[] = [];
  
  // Primary location (Al Quoz)
  if (process.env.GOOGLE_MY_BUSINESS_LOCATION_ID && process.env.GOOGLE_MY_BUSINESS_ACCOUNT_ID) {
    locations.push({
      locationId: process.env.GOOGLE_MY_BUSINESS_LOCATION_ID,
      accountId: process.env.GOOGLE_MY_BUSINESS_ACCOUNT_ID,
      name: 'Al Quoz',
    });
  }
  
  // Additional locations
  const additionalLocations = [
    { envLocation: 'GOOGLE_SHARJAH_LOCATION_ID', envAccount: 'GOOGLE_SHARJAH_ACCOUNT_ID', name: 'Sharjah' },
    { envLocation: 'GOOGLE_SILICON_LOCATION_ID', envAccount: 'GOOGLE_SILICON_ACCOUNT_ID', name: 'Silicon Oasis' },
    { envLocation: 'GOOGLE_ABUDHABI_LOCATION_ID', envAccount: 'GOOGLE_ABUDHABI_ACCOUNT_ID', name: 'Abu Dhabi' },
    { envLocation: 'GOOGLE_ARJAN_LOCATION_ID', envAccount: 'GOOGLE_ARJAN_ACCOUNT_ID', name: 'Arjan' },
  ];
  
  additionalLocations.forEach(({ envLocation, envAccount, name }) => {
    const locationId = process.env[envLocation];
    const accountId = process.env[envAccount];
    if (locationId && accountId) {
      locations.push({ locationId, accountId, name });
    }
  });
  
  return locations;
}

async function fetchMediaFromLocation(
  locationId: string,
  accountId: string,
  accessToken: string
): Promise<any[]> {
  try {
    const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/media`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Error fetching media for location ${locationId}:`, errorData);
      return [];
    }

    const data = await response.json();
    return data.media || [];
  } catch (error) {
    console.error(`Error fetching media from location ${locationId}:`, error);
    return [];
  }
}

export async function GET() {
  try {
    const accessToken = process.env.GOOGLE_MY_BUSINESS_ACCESS_TOKEN;
    
    if (!accessToken) {
      console.error('Missing GOOGLE_MY_BUSINESS_ACCESS_TOKEN environment variable');
      return NextResponse.json(
        { 
          error: 'Google My Business credentials not configured',
          message: 'Please add GOOGLE_MY_BUSINESS_ACCESS_TOKEN to your .env.local file'
        },
        { status: 500 }
      );
    }

    const locations = getLocations();
    
    if (locations.length === 0) {
      console.error('No Google My Business locations found. Check environment variables:');
      console.error('- GOOGLE_MY_BUSINESS_LOCATION_ID:', process.env.GOOGLE_MY_BUSINESS_LOCATION_ID ? 'Set' : 'Missing');
      console.error('- GOOGLE_MY_BUSINESS_ACCOUNT_ID:', process.env.GOOGLE_MY_BUSINESS_ACCOUNT_ID ? 'Set' : 'Missing');
      return NextResponse.json(
        { 
          error: 'Google My Business credentials not configured',
          message: 'Please add location and account IDs to your .env.local file'
        },
        { status: 500 }
      );
    }

    // Fetch media from all locations in parallel
    const mediaPromises = locations.map(location =>
      fetchMediaFromLocation(location.locationId, location.accountId, accessToken)
    );
    
    const allMediaArrays = await Promise.all(mediaPromises);
    
    // Flatten and combine all media
    const allMedia = allMediaArrays.flat();
    
    // Sort by date (newest first)
    allMedia.sort((a, b) => {
      const dateA = new Date(a.createTime).getTime();
      const dateB = new Date(b.createTime).getTime();
      return dateB - dateA;
    });
    
    // Transform the data
    const media = allMedia.map((item: GoogleMedia) => ({
      id: item.googleUrl,
      url: item.googleUrl,
      thumbnail: item.thumbnailUrl || item.googleUrl,
      type: item.mediaType || 'PHOTO',
      date: formatDate(item.createTime),
    }));

    return NextResponse.json({ media });
  } catch (error) {
    console.error('Error fetching Google media:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
