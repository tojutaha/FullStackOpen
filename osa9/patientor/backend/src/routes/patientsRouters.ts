import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
    // res.send(patientsService.getPatients());
    res.send(patientsService.getNonSensitivePatientData());
});

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
router.post('/', (req, res) => {
    const { name, occupation, gender, ssn, dateOfBirth } = req.body;
    const addedPatient = patientsService.addPatient({
        name,
        occupation,
        gender,
        ssn,
        dateOfBirth,
    });

    res.json(addedPatient);
});

export default router;