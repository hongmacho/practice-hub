import { NextRequest, NextResponse } from 'next/server';
import { getAllAppointments, createAppointment } from '@/lib/repositories/appointment';

const CLINIC_ID = 1;

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const date = searchParams.get('date') || undefined;
    const result = await getAllAppointments(CLINIC_ID, date);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ error: '예약 조회 실패' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const appointment = await createAppointment({
      clinicId: CLINIC_ID,
      ...data,
    });
    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json({ error: '예약 등록 실패' }, { status: 500 });
  }
}
