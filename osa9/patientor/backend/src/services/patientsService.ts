import data from '../../data/patients';
import { Patient, NonSensitivePatientData } from '../../../frontend/src/types';

const patients: Patient[] = data as Patient[];

const getPatients = () => {
    return patients;
};

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
    return patients.map(({ id, name, occupation, gender, dateOfBirth }) => ({
        id,
        name,
        occupation,
        gender,
        dateOfBirth
    }));
};


export default {
    getPatients,
    getNonSensitivePatientData,
};