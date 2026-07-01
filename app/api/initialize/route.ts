import { NextRequest, NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seed';

export async function POST(req: NextRequest) {
  try {
    await seedDatabase();
    return NextResponse.json(
      { message: '데이터베이스 초기화 완료' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Initialization error:', error);
    return NextResponse.json(
      { error: '초기화 실패' },
      { status: 500 }
    );
  }
}
