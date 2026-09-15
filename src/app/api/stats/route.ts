import { NextResponse } from 'next/server';
import { getUserStatsFromDB, updateUserStatsInDB } from '@/lib/db/stats';
import { UserStats } from '@/lib/storage';

export async function GET() {
  try {
    const stats = getUserStatsFromDB();
    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching stats from SQLite:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user stats' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const updates = (await request.json()) as Partial<UserStats>;
    const updatedStats = updateUserStatsInDB(updates);

    return NextResponse.json({
      success: true,
      data: updatedStats,
    });
  } catch (error) {
    console.error('Error updating stats in SQLite:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update user stats' },
      { status: 500 }
    );
  }
}
