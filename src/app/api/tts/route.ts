import { NextRequest, NextResponse } from 'next/server';
import { generateElevenLabsSpeech } from '@/lib/ai/elevenlabs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text');

  if (!text || text.trim().length === 0) {
    return NextResponse.json({ success: false, error: 'Tham số text là bắt buộc' }, { status: 400 });
  }

  const result = await generateElevenLabsSpeech(text);

  if (result) {
    return new NextResponse(new Uint8Array(result.buffer), {
      status: 200,
      headers: {
        'Content-Type': result.contentType,
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  }

  // Nếu ElevenLabs hết quota hoặc lỗi, báo client dùng Web Speech API
  return NextResponse.json({
    success: false,
    fallback: 'web-speech',
    message: 'ElevenLabs unavailable or quota reached. Fallback to browser TTS.',
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ success: false, error: 'Text là bắt buộc' }, { status: 400 });
    }

    const result = await generateElevenLabsSpeech(text);

    if (result) {
      return new NextResponse(new Uint8Array(result.buffer), {
        status: 200,
        headers: {
          'Content-Type': result.contentType,
          'Cache-Control': 'public, max-age=86400',
        },
      });
    }

    return NextResponse.json({
      success: false,
      fallback: 'web-speech',
      message: 'ElevenLabs unavailable or quota reached. Fallback to browser TTS.',
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
