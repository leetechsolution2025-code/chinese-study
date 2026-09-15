import { NextResponse } from 'next/server';
import { getMockExams, getExamHistory } from '@/lib/db/exams';

export async function GET() {
  try {
    const exams = getMockExams();
    const history = getExamHistory();

    return NextResponse.json({
      success: true,
      data: {
        exams,
        history,
      },
    });
  } catch (error) {
    console.error('Error fetching mock exams:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
