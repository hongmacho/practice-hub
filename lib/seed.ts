import { db } from './db';
import { users, patients, appointments, medicalRecords, payments } from './schema';
import { format } from 'date-fns';

export async function seedDatabase() {
  try {
    // Insert sample user (clinic admin/doctor)
    await db
      .insert(users)
      .values({
        email: 'doctor@clinic.kr',
        passwordHash: 'demo_hash_123', // In production, use proper hashing
        name: '김의사',
        role: 'doctor',
        clinicId: 1,
      })
      .run();

    // Insert sample patients
    const patientIds = [];
    const samplePatients = [
      {
        clinicId: 1,
        name: '이환자',
        email: 'patient1@example.kr',
        phone: '010-1234-5678',
        birthDate: '1985-03-15',
        gender: 'M',
        address: '서울시 강남구',
        medicalHistory: '고혈압, 당뇨병 가족력',
      },
      {
        clinicId: 1,
        name: '박환자',
        email: 'patient2@example.kr',
        phone: '010-2345-6789',
        birthDate: '1992-07-22',
        gender: 'F',
        address: '서울시 서초구',
        medicalHistory: '알레르기성 비염',
      },
      {
        clinicId: 1,
        name: '최환자',
        email: 'patient3@example.kr',
        phone: '010-3456-7890',
        birthDate: '1980-11-10',
        gender: 'M',
        address: '서울시 강서구',
        medicalHistory: '없음',
      },
      {
        clinicId: 1,
        name: '정환자',
        email: 'patient4@example.kr',
        phone: '010-4567-8901',
        birthDate: '1995-05-05',
        gender: 'F',
        address: '서울시 마포구',
        medicalHistory: '천식',
      },
      {
        clinicId: 1,
        name: '조환자',
        email: 'patient5@example.kr',
        phone: '010-5678-9012',
        birthDate: '1988-09-18',
        gender: 'M',
        address: '서울시 송파구',
        medicalHistory: '골다공증 예방',
      },
    ];

    for (const patient of samplePatients) {
      const result = await db.insert(patients).values(patient).run();
      patientIds.push(result.lastInsertRowid);
    }

    // Insert sample appointments
    const today = new Date();
    const appointmentDates = [
      format(today, 'yyyy-MM-dd'),
      format(new Date(today.getTime() + 86400000), 'yyyy-MM-dd'),
      format(new Date(today.getTime() + 172800000), 'yyyy-MM-dd'),
    ];

    const sampleAppointments = [
      {
        clinicId: 1,
        patientId: patientIds[0] as number,
        appointmentDate: appointmentDates[0],
        timeSlot: '09:00',
        status: 'scheduled',
        notes: '정기 검진',
      },
      {
        clinicId: 1,
        patientId: patientIds[1] as number,
        appointmentDate: appointmentDates[0],
        timeSlot: '10:30',
        status: 'completed',
        notes: '감기 증상',
      },
      {
        clinicId: 1,
        patientId: patientIds[2] as number,
        appointmentDate: appointmentDates[1],
        timeSlot: '14:00',
        status: 'scheduled',
        notes: '재진 - 고혈압 관리',
      },
      {
        clinicId: 1,
        patientId: patientIds[3] as number,
        appointmentDate: appointmentDates[1],
        timeSlot: '15:30',
        status: 'scheduled',
        notes: '신환 - 알레르기 검사',
      },
      {
        clinicId: 1,
        patientId: patientIds[4] as number,
        appointmentDate: appointmentDates[2],
        timeSlot: '11:00',
        status: 'scheduled',
        notes: '예방 접종',
      },
    ];

    for (const appointment of sampleAppointments) {
      await db.insert(appointments).values(appointment).run();
    }

    // Insert sample medical records
    const sampleRecords = [
      {
        clinicId: 1,
        patientId: patientIds[0] as number,
        visitDate: format(new Date(today.getTime() - 86400000 * 7), 'yyyy-MM-dd'),
        chiefComplaint: '정기 검진',
        diagnosis: '고혈압 (관리중)',
        treatment: '약물 치료 지속',
        prescription: '고혈압약 1종류',
        notes: '혈압 정상 범위내',
      },
      {
        clinicId: 1,
        patientId: patientIds[1] as number,
        visitDate: format(today, 'yyyy-MM-dd'),
        chiefComplaint: '감기 증상',
        diagnosis: '감기',
        treatment: '약물 치료',
        prescription: '감기약, 기침약',
        notes: '3일 후 재진',
      },
      {
        clinicId: 1,
        patientId: patientIds[2] as number,
        visitDate: format(new Date(today.getTime() - 86400000 * 14), 'yyyy-MM-dd'),
        chiefComplaint: '두통',
        diagnosis: '긴장성 두통',
        treatment: '약물 치료',
        prescription: '진통제',
        notes: '스트레스 관리 권고',
      },
      {
        clinicId: 1,
        patientId: patientIds[3] as number,
        visitDate: format(new Date(today.getTime() - 86400000 * 30), 'yyyy-MM-dd'),
        chiefComplaint: '신환 접수',
        diagnosis: '건강검진',
        treatment: '검진 완료',
        prescription: '종합감기약',
        notes: '정상 범위',
      },
    ];

    for (const record of sampleRecords) {
      await db.insert(medicalRecords).values(record).run();
    }

    // Insert sample payments
    const samplePayments = [
      {
        clinicId: 1,
        patientId: patientIds[0] as number,
        amount: 80000,
        status: 'paid',
        dueDate: format(new Date(today.getTime() - 86400000 * 7), 'yyyy-MM-dd'),
        paidDate: format(new Date(today.getTime() - 86400000 * 5), 'yyyy-MM-dd'),
        description: '정기 검진료',
      },
      {
        clinicId: 1,
        patientId: patientIds[1] as number,
        amount: 50000,
        status: 'paid',
        dueDate: format(today, 'yyyy-MM-dd'),
        paidDate: format(today, 'yyyy-MM-dd'),
        description: '감기 진료료',
      },
      {
        clinicId: 1,
        patientId: patientIds[2] as number,
        amount: 60000,
        status: 'pending',
        dueDate: format(new Date(today.getTime() + 86400000 * 7), 'yyyy-MM-dd'),
        description: '두통 진료료',
      },
      {
        clinicId: 1,
        patientId: patientIds[3] as number,
        amount: 100000,
        status: 'overdue',
        dueDate: format(new Date(today.getTime() - 86400000 * 10), 'yyyy-MM-dd'),
        description: '건강검진료',
      },
      {
        clinicId: 1,
        patientId: patientIds[4] as number,
        amount: 45000,
        status: 'pending',
        dueDate: format(new Date(today.getTime() + 86400000 * 3), 'yyyy-MM-dd'),
        description: '예방 접종료',
      },
    ];

    for (const payment of samplePayments) {
      await db.insert(payments).values(payment).run();
    }

    console.log('✓ Database seeded successfully!');
  } catch (error) {
    console.error('✗ Error seeding database:', error);
    throw error;
  }
}
