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

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

export type NonSensitivePatientData = Omit<PatientEntry, 'ssn'>;
export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;
// export type NewPatientEntry = Omit<Patient, 'id'>;
export type NewPatientEntry = z.infer<typeof NewPatientSchema>;
export interface PatientEntry extends NewPatientEntry {
  id: string,
} 