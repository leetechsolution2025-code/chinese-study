import { NextResponse } from 'next/server';
import { getCoursesWithProgress } from '@/lib/db/courses';

export async function GET() {
  try {
    const courses = getCoursesWithProgress();
    return NextResponse.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error('Error fetching courses from SQLite:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}
