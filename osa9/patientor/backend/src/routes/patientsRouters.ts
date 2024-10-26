import express, { Request, Response, NextFunction } from 'express';
import patientsService from '../services/patientsService';
import { z } from 'zod';
import { NewPatientSchema } from '../utils';
import { PatientEntry, NewPatientEntry } from '../../../shared/types';

const router = express.Router();

router.get('/', (_req, res) => {
    // res.send(patientsService.getPatients());
    res.send(patientsService.getNonSensitivePatientData());
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

