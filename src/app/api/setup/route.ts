import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST() {
  try {
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ username: 'test' });
    if (existingUser) {
      return NextResponse.json(
        { message: 'Test user already exists' },
        { status: 200 }
      );
    }

    // Create test user
    const user = new User({
      username: 'test',
      password: 'test123', // This will be hashed by the pre-save hook
    });

    await user.save();

    return NextResponse.json(
      { message: 'Test user created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 