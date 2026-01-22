import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  like_count?: number;
  media_type: string;
}

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const instagramBusinessId = process.env.INSTAGRAM_BUSINESS_ID;

    if (!accessToken || !instagramBusinessId) {
      return NextResponse.json(
        { error: 'Instagram credentials not configured' },
        { status: 500 }
      );
    }

    // Fetch recent media from Instagram Graph API
    const url = `https://graph.facebook.com/v18.0/${instagramBusinessId}/media?fields=id,media_url,permalink,caption,timestamp,like_count,media_type&limit=12&access_token=${accessToken}`;
    
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Instagram API Error:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch Instagram posts', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Transform the data to match our component's interface
    const posts = data.data.map((post: InstagramPost) => ({
      id: post.id,
      image: post.media_url,
      caption: post.caption ? post.caption.split('\n')[0].substring(0, 100) : '',
      likes: post.like_count || 0,
      date: formatDate(post.timestamp),
      permalink: post.permalink,
      mediaType: post.media_type,
    }));

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching Instagram feed:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
}
