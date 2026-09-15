import { NextResponse } from 'next/server';
import { getAllVocab } from '@/lib/db/vocab';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const levelParam = searchParams.get('level');
    const searchParam = searchParams.get('q');

    const level = levelParam ? parseInt(levelParam, 10) : undefined;
    const search = searchParam ? searchParam.trim() : undefined;

    const vocabularies = getAllVocab(level, search);

    return NextResponse.json({
      success: true,
      count: vocabularies.length,
      data: vocabularies,
    });
  } catch (error) {
    console.error('Error fetching vocabularies from SQLite:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch vocabularies' },
      { status: 500 }
    );
  }
}
