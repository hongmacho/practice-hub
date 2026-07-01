import { db } from '../db';
import { patients } from '../schema';
import { eq, like, and } from 'drizzle-orm';

export interface PatientInput {
  clinicId: number;
  name: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  gender?: string;
  address?: string;
  medicalHistory?: string;
}

export async function getAllPatients(clinicId: number, search?: string, page = 1, limit = 10) {
  try {
    let query = db.query.patients.findMany({
      where: eq(patients.clinicId, clinicId),
    });

    if (search) {
      query = db.query.patients.findMany({
        where: and(
          eq(patients.clinicId, clinicId),
          like(patients.name, `%${search}%`)
        ),
      });
    }

    const allPatients = await query;
    const total = allPatients.length;
    const offset = (page - 1) * limit;
    const paginatedPatients = allPatients.slice(offset, offset + limit);

    return {
      data: paginatedPatients,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw new Error('환자 목록 조회에 실패했습니다.');
  }
}

export async function getPatientById(id: number) {
  try {
    const patient = await db.query.patients.findFirst({
      where: eq(patients.id, id),
    });

    if (!patient) {
      throw new Error('환자를 찾을 수 없습니다.');
    }

    return patient;
  } catch (error) {
    console.error('Error fetching patient:', error);
    throw new Error('환자 조회에 실패했습니다.');
  }
}

export async function createPatient(data: PatientInput) {
  try {
    const result = await db.insert(patients).values(data).run();
    return {
      id: result.lastInsertRowid,
      ...data,
    };
  } catch (error) {
    console.error('Error creating patient:', error);
    throw new Error('환자 등록에 실패했습니다.');
  }
}

export async function updatePatient(id: number, data: Partial<PatientInput>) {
  try {
    const updatedData = {
      ...data,
      updatedAt: new Date().toISOString(),
    };

    await db.update(patients).set(updatedData).where(eq(patients.id, id)).run();
    return getPatientById(id);
  } catch (error) {
    console.error('Error updating patient:', error);
    throw new Error('환자 정보 수정에 실패했습니다.');
  }
}

export async function deletePatient(id: number) {
  try {
    await db.delete(patients).where(eq(patients.id, id)).run();
  } catch (error) {
    console.error('Error deleting patient:', error);
    throw new Error('환자 삭제에 실패했습니다.');
  }
}
