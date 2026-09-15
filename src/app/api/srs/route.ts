import { NextResponse } from 'next/server';
import { getAllSRSItems, recordSRSRating } from '@/lib/db/srs';
import { SRSRating } from '@/types';

export async function GET() {
  try {
    const deck = getAllSRSItems();
    return NextResponse.json({
      success: true,
      data: deck,
    });
  } catch (error) {
    console.error('Error getting SRS deck from SQLite:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch SRS deck' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { vocabId, rating } = body as { vocabId: string; rating: SRSRating };

    if (!vocabId || !rating) {
      return NextResponse.json(
        { success: false, error: 'vocabId and rating are required' },
        { status: 400 }
      );
    }

    const updatedItem = recordSRSRating(vocabId, rating);

    return NextResponse.json({
      success: true,
      data: updatedItem,
    });
  } catch (error) {
    console.error('Error saving SRS rating to SQLite:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record SRS rating' },
      { status: 500 }
    );
  }
}
