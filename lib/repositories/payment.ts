import { db } from '../db';
import { payments } from '../schema';
import { eq } from 'drizzle-orm';

export interface PaymentInput {
  clinicId: number;
  patientId: number;
  amount: number;
  status: string;
  dueDate?: string;
  paidDate?: string;
  description?: string;
}

export async function getPaymentsByClinicId(clinicId: number) {
  try {
    return await db.query.payments.findMany({
      where: eq(payments.clinicId, clinicId),
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw new Error('결제 목록 조회에 실패했습니다.');
  }
}

export async function getPaymentsByPatientId(patientId: number) {
  try {
    return await db.query.payments.findMany({
      where: eq(payments.patientId, patientId),
    });
  } catch (error) {
    console.error('Error fetching patient payments:', error);
    throw new Error('환자 결제 조회에 실패했습니다.');
  }
}

export async function getPaymentById(id: number) {
  try {
    const payment = await db.query.payments.findFirst({
      where: eq(payments.id, id),
    });
    if (!payment) throw new Error('결제를 찾을 수 없습니다.');
    return payment;
  } catch (error) {
    console.error('Error fetching payment:', error);
    throw new Error('결제 조회에 실패했습니다.');
  }
}

export async function createPayment(data: PaymentInput) {
  try {
    const result = await db.insert(payments).values(data).run();
    return { id: result.lastInsertRowid, ...data };
  } catch (error) {
    console.error('Error creating payment:', error);
    throw new Error('결제 등록에 실패했습니다.');
  }
}

export async function updatePayment(id: number, data: Partial<PaymentInput>) {
  try {
    const updatedData = { ...data, updatedAt: new Date().toISOString() };
    await db.update(payments).set(updatedData).where(eq(payments.id, id)).run();
    return getPaymentById(id);
  } catch (error) {
    console.error('Error updating payment:', error);
    throw new Error('결제 수정에 실패했습니다.');
  }
}

export async function deletePayment(id: number) {
  try {
    await db.delete(payments).where(eq(payments.id, id)).run();
  } catch (error) {
    console.error('Error deleting payment:', error);
    throw new Error('결제 삭제에 실패했습니다.');
  }
}
