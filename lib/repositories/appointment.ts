import { db } from '../db';
import { appointments } from '../schema';
import { eq, and } from 'drizzle-orm';

export interface AppointmentInput {
  clinicId: number;
  patientId: number;
  appointmentDate: string;
  timeSlot: string;
  status: string;
  notes?: string;
}

export async function getAllAppointments(clinicId: number, date?: string) {
  try {
    if (date) {
      return await db.query.appointments.findMany({
        where: and(
          eq(appointments.clinicId, clinicId),
          eq(appointments.appointmentDate, date)
        ),
      });
    }
    return await db.query.appointments.findMany({
      where: eq(appointments.clinicId, clinicId),
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw new Error('예약 목록 조회에 실패했습니다.');
  }
}

export async function getAppointmentById(id: number) {
  try {
    const appointment = await db.query.appointments.findFirst({
      where: eq(appointments.id, id),
    });
    if (!appointment) throw new Error('예약을 찾을 수 없습니다.');
    return appointment;
  } catch (error) {
    console.error('Error fetching appointment:', error);
    throw new Error('예약 조회에 실패했습니다.');
  }
}

export async function createAppointment(data: AppointmentInput) {
  try {
    const result = await db.insert(appointments).values(data).run();
    return { id: result.lastInsertRowid, ...data };
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw new Error('예약 등록에 실패했습니다.');
  }
}

export async function updateAppointment(id: number, data: Partial<AppointmentInput>) {
  try {
    const updatedData = { ...data, updatedAt: new Date().toISOString() };
    await db.update(appointments).set(updatedData).where(eq(appointments.id, id)).run();
    return getAppointmentById(id);
  } catch (error) {
    console.error('Error updating appointment:', error);
    throw new Error('예약 수정에 실패했습니다.');
  }
}

export async function deleteAppointment(id: number) {
  try {
    await db.delete(appointments).where(eq(appointments.id, id)).run();
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw new Error('예약 삭제에 실패했습니다.');
  }
}
