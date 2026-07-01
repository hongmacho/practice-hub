import { NextRequest, NextResponse } from 'next/server';
import { getAllPatients, createPatient } from '@/lib/repositories/patient';

const CLINIC_ID = 1;

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get('search') || undefined;
    const page = parseInt(searchParams.get('page') || '1');

    const result = await getAllPatients(CLINIC_ID, search, page);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json(
      { error: '환자 목록 조회 실패' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const patient = await createPatient({
      clinicId: CLINIC_ID,
      ...data,
    });
    return NextResponse.json(patient, { status: 201 });
  } catch (error) {
    console.error('Error creating patient:', error);
    return NextResponse.json(
      { error: '환자 등록 실패' },
      { status: 500 }
    );
  }
}
