import { NextRequest, NextResponse } from 'next/server';
import { chatWithGemini } from '@/lib/ai/gemini';

export async function POST(req: NextRequest) {
  try {
    const { message, scenario, history } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Tin nhắn không hợp lệ' },
        { status: 400 }
      );
    }

    const reply = await chatWithGemini({
      message,
      scenario,
      history,
    });

    return NextResponse.json({
      success: true,
      reply,
      provider: 'gemini',
    });
  } catch (error) {
    console.error('Error in AI Chat route:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi xử lý phản hồi từ AI' },
      { status: 500 }
    );
  }
}
