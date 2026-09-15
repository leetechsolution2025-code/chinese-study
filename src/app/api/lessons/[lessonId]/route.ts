import { NextResponse } from 'next/server';
import { getLessonById } from '@/lib/db/courses';

export async function GET(
  request: Request,
  context: { params: Promise<{ lessonId: string }> }
) {
  try {
    const { lessonId } = await context.params;
    const lesson = getLessonById(lessonId);

    if (!lesson) {
      return NextResponse.json(
        { success: false, error: 'Lesson not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: lesson,
    });
  } catch (error) {
    console.error('Error fetching lesson from SQLite:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch lesson' },
      { status: 500 }
    );
  }
}
