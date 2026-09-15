import { NextResponse } from 'next/server';
import { saveLessonProgress } from '@/lib/db/courses';

export async function POST(
  request: Request,
  context: { params: Promise<{ lessonId: string }> }
) {
  try {
    const { lessonId } = await context.params;
    const body = await request.json();
    const { courseId, score } = body as { courseId: string; score: number };

    if (!courseId) {
      return NextResponse.json(
        { success: false, error: 'courseId is required' },
        { status: 400 }
      );
    }

    saveLessonProgress(lessonId, courseId, score ?? 100);

    return NextResponse.json({
      success: true,
      message: 'Lesson completed successfully',
    });
  } catch (error) {
    console.error('Error completing lesson in SQLite:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to complete lesson' },
      { status: 500 }
    );
  }
}
