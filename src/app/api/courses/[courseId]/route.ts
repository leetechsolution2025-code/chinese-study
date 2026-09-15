import { NextResponse } from 'next/server';
import { getCourseById, getLessonsByCourse } from '@/lib/db/courses';

export async function GET(
  request: Request,
  context: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await context.params;
    const course = getCourseById(courseId);

    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    const lessons = getLessonsByCourse(courseId);

    return NextResponse.json({
      success: true,
      data: {
        course,
        lessons,
      },
    });
  } catch (error) {
    console.error('Error fetching course details from SQLite:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch course details' },
      { status: 500 }
    );
  }
}
