import { Gender, NewPatientEntry } from "../../shared/types";
import { z } from 'zod';


export const NewPatientSchema = z.object({
    name: z.string(),
    occupation: z.string(),
    gender: z.nativeEnum(Gender),
    ssn: z.string().optional(),
    dateOfBirth: z.string().date(),
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    return NewPatientSchema.parse(object);
};
