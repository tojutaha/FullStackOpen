import express, { Request, Response, NextFunction } from 'express';
import patientsService from '../services/patientsService';
import { z } from 'zod';
import { v1 as uuid} from 'uuid';
import { EntrySchema, NewPatientSchema } from '../utils';
import { PatientEntry, NewPatientEntry, Patient } from '../../../shared/types';
import patients from '../../data/patients';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getNonSensitivePatientData());
});

const findById = (id: string): Patient | undefined => {
    const entry = patients.find(p => p.id === id);
    return entry;
};

router.get('/:id', (req, res) => {
    const patient = findById(req.params.id) as Patient;
    res.send(patient);
});

router.get('/:id/entries', (req, res) => {
    const patient = findById(req.params.id) as Patient;
    res.send(patient.entries);
});

router.post('/:id/entries', (req: Request<{ id: string }>, res: Response) => {
    const patient = findById(req.params.id) as Patient;

    if(!patient) {
        res.status(404).send({error: 'Patient not found'});
    }

    const newEntry = EntrySchema.parse(req.body);
    const entryWithId = { ...newEntry, id: uuid() };

    patient.entries.push(entryWithId);

    res.status(201).json(entryWithId);
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