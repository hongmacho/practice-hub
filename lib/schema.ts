import {
  integer,
  text,
  real,
  sqliteTable,
  primaryKey,
} from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull(),
  role: text('role').notNull(),
  clinicId: integer('clinic_id'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const patients = sqliteTable('patients', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  clinicId: integer('clinic_id').notNull(),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  birthDate: text('birth_date'),
  gender: text('gender'),
  address: text('address'),
  medicalHistory: text('medical_history'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const appointments = sqliteTable('appointments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  clinicId: integer('clinic_id').notNull(),
  patientId: integer('patient_id').notNull(),
  appointmentDate: text('appointment_date').notNull(),
  timeSlot: text('time_slot').notNull(),
  status: text('status').notNull(),
  notes: text('notes'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const medicalRecords = sqliteTable('medical_records', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  clinicId: integer('clinic_id').notNull(),
  patientId: integer('patient_id').notNull(),
  visitDate: text('visit_date').notNull(),
  chiefComplaint: text('chief_complaint'),
  diagnosis: text('diagnosis'),
  treatment: text('treatment'),
  prescription: text('prescription'),
  notes: text('notes'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const payments = sqliteTable('payments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  clinicId: integer('clinic_id').notNull(),
  patientId: integer('patient_id').notNull(),
  amount: real('amount').notNull(),
  status: text('status').notNull(),
  dueDate: text('due_date'),
  paidDate: text('paid_date'),
  description: text('description'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});
