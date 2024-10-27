import { z } from 'zod';
import { NewPatientSchema } from '../backend/src/utils';
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type NonSensitivePatientData = Omit<PatientEntry, 'ssn' | 'entries'>;
export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;
export type NewPatientEntry = z.infer<typeof NewPatientSchema>;
export interface PatientEntry extends NewPatientEntry {
  id: string,
} 