import { Gender, NewPatientEntry } from "../../shared/types";
import { z } from 'zod';

// interface BaseEntry {
//   id: string;
//   description: string;
//   date: string;
//   specialist: string;
//   diagnosisCodes?: Array<Diagnosis['code']>;
// }

// export enum HealthCheckRating {
//   "Healthy" = 0,
//   "LowRisk" = 1,
//   "HighRisk" = 2,
//   "CriticalRisk" = 3,
// }

// interface HospitalEntry extends BaseEntry {
//   type: "Hospital";
//   discharge: {
//     date: string;
//     criteria: string;
//   };
// }

// interface OccupationalHealthcareEntry extends BaseEntry {
//   type: "OccupationalHealthcare";
//   employerName: string;
//   sickLeave?: {
//     startDate: string;
//     endDate: string;
//   };
// }

// interface HealthCheckEntry extends BaseEntry {
//   type: "HealthCheck";
//   healthCheckRating: HealthCheckRating;
// }

// export type Entry =
//   | HospitalEntry
//   | OccupationalHealthcareEntry
//   | HealthCheckEntry;

export const NewPatientSchema = z.object({
    name: z.string(),
    occupation: z.string(),
    gender: z.nativeEnum(Gender),
    ssn: z.string().optional(),
    dateOfBirth: z.string().date(),
    entries: z.array(z.any()).optional(),
});

//
//
//

// export const HospitalEntrySchema = z.object({
//   type: z.literal("Hospital"),
//   discharge: z.object({
//     date: z.string().date(),
//     criteria: z.string(),
//   }),
//   description: z.string(),
//   date: z.string().date(),
//   specialist: z.string(),
// });

// export const OccupationalHealthcareEntrySchema = z.object({
//   type: z.literal("OccupationalHealthcare"),
//   employerName: z.string(),
//   description: z.string(),
//   date: z.string().date(),
//   specialist: z.string(),
//   sickLeave: z
//     .object({
//       startDate: z.string().date(),
//       endDate: z.string().date(),
//     })
//     .optional(),
// });

// export const HealthCheckEntrySchema = z.object({
//   type: z.literal("HealthCheck"),
//   healthCheckRating: z.number().int().min(0).max(3),
//   description: z.string(),
//   date: z.string().date(),
//   specialist: z.string(),
// });

// export const EntrySchema = z.union([
//   HospitalEntrySchema,
//   OccupationalHealthcareEntrySchema,
//   HealthCheckEntrySchema,
// ]);

// export const NewPatientSchema = z.object({
//   name: z.string(),
//   occupation: z.string(),
//   gender: z.nativeEnum(Gender),
//   ssn: z.string().optional(),
//   dateOfBirth: z.string().date(),
//   entries: z.array(EntrySchema).optional(),
// });

//
//
//

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    return NewPatientSchema.parse(object);
};
