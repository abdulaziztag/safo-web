import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import YouTubeLink from '@/models/YouTubeLink';

// GET /api/youtube
export async function GET() {
  try {
    await connectDB();
    
    let link = await YouTubeLink.findOne().sort({ createdAt: -1 });
    
    if (!link) {
      // Create default link if none exists
      link = await YouTubeLink.create({
        videoId: 'dQw4w9WgXcQ',
        title: 'Default Video',
      });
    }
    
    return NextResponse.json(link);
  } catch (error) {
    console.error('Error fetching YouTube link:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/youtube
export async function POST(request: Request) {
  try {
    const { videoId, title } = await request.json();
    
    if (!videoId || !title) {
      return NextResponse.json(
        { error: 'Video ID and title are required' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    const link = await YouTubeLink.create({
      videoId,
      title,
    });
    
    return NextResponse.json(link);
  } catch (error) {
    console.error('Error updating YouTube link:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 