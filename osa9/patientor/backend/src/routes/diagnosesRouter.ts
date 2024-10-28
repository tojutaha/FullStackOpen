import express from 'express';
import diagnoseService from '../services/diagnoseService';
import data from '../../data/diagnoses';
import { Diagnosis } from '../../../shared/types';

const router = express.Router();

router.get('/', (_reg, res) => {
    res.send(diagnoseService.getDiagnoses());
});

const findByCode = (code: string) => {
    const entry = data.find(d => d.code === code);
    return entry;
};

router.get('/:code', (req, res) => {
    const diagnose = findByCode(req.params.code) as Diagnosis;
    res.send(diagnose);
});

export default router;