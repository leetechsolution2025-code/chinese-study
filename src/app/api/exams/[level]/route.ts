import { NextRequest, NextResponse } from 'next/server';
import { getMockExamByLevel } from '@/lib/db/exams';

interface RouteContext {
  params: Promise<{
    level: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { level: levelParam } = await context.params;
    // Extract level number from "hsk1", "hsk2", "1", "2"
    const match = levelParam.match(/\d+/);
    const levelNum = match ? parseInt(match[0], 10) : 1;

    const exam = getMockExamByLevel(levelNum);

    if (!exam) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy đề thi cho cấp độ này' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: exam,
    });
  } catch (error) {
    console.error('Error fetching mock exam by level:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
