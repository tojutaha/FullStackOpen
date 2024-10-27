import express, { Request, Response, NextFunction } from 'express';
import patientsService from '../services/patientsService';
import { z } from 'zod';
import { NewPatientSchema } from '../utils';
import { PatientEntry, NewPatientEntry, Patient } from '../../../shared/types';
import patientEntries from '../../data/patients';

const router = express.Router();

router.get('/', (_req, res) => {
    // res.send(patientsService.getPatients());
    res.send(patientsService.getNonSensitivePatientData());
});

const findById = (id: string): PatientEntry | undefined => {
    const entry = patientEntries.find(p => p.id === id);
    return entry;
};

router.get('/:id', (req, res) => {
    const patient = findById(req.params.id) as Patient;
    // console.log(patient);
    res.send(patient);
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewPatientSchema.parse(req.body);
        next();
    } catch(error: unknown) {
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if(error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
    const addedEntry = patientsService.addPatient(req.body);
    res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;

