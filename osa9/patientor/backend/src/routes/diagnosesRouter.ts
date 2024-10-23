import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_reg, res) => {
    // res.send('Fetching all diagnoses');
    res.send(diagnoseService.getDiagnoses());
});

export default router;