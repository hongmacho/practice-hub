import { db } from '../db';
import { medicalRecords } from '../schema';
import { eq } from 'drizzle-orm';

export interface MedicalRecordInput {
  clinicId: number;
  patientId: number;
  visitDate: string;
  chiefComplaint?: string;
  diagnosis?: string;
  treatment?: string;
  prescription?: string;
  notes?: string;
}

export async function getRecordsByPatientId(patientId: number) {
  try {
    return await db.query.medicalRecords.findMany({
      where: eq(medicalRecords.patientId, patientId),
    });
  } catch (error) {
    console.error('Error fetching medical records:', error);
    throw new Error('진료 기록 조회에 실패했습니다.');
  }
}

export async function getRecordById(id: number) {
  try {
    const record = await db.query.medicalRecords.findFirst({
      where: eq(medicalRecords.id, id),
    });
    if (!record) throw new Error('진료 기록을 찾을 수 없습니다.');
    return record;
  } catch (error) {
    console.error('Error fetching record:', error);
    throw new Error('진료 기록 조회에 실패했습니다.');
  }
}

export async function createRecord(data: MedicalRecordInput) {
  try {
    const result = await db.insert(medicalRecords).values(data).run();
    return { id: result.lastInsertRowid, ...data };
  } catch (error) {
    console.error('Error creating record:', error);
    throw new Error('진료 기록 등록에 실패했습니다.');
  }
}

export async function updateRecord(id: number, data: Partial<MedicalRecordInput>) {
  try {
    const updatedData = { ...data, updatedAt: new Date().toISOString() };
    await db.update(medicalRecords).set(updatedData).where(eq(medicalRecords.id, id)).run();
    return getRecordById(id);
  } catch (error) {
    console.error('Error updating record:', error);
    throw new Error('진료 기록 수정에 실패했습니다.');
  }
}

export async function deleteRecord(id: number) {
  try {
    await db.delete(medicalRecords).where(eq(medicalRecords.id, id)).run();
  } catch (error) {
    console.error('Error deleting record:', error);
    throw new Error('진료 기록 삭제에 실패했습니다.');
  }
}
