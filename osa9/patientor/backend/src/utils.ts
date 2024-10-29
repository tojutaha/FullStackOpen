import { Gender, NewPatientEntry } from "../../shared/types";
import { z } from 'zod';

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

const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().refine(date => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
    criteria: z.string(),
  }),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }).optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.number().int().min(0).max(3),
});

export const EntrySchema = z.union([HospitalEntrySchema, OccupationalHealthcareEntrySchema, HealthCheckEntrySchema]);

//
//
//

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    return NewPatientSchema.parse(object);
};
