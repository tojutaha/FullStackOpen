import patients from '../../data/patients';
import { PatientEntry, NewPatientEntry, NonSensitivePatientData } from '../../../shared/types';
import { v1 as uuid } from 'uuid';

const getPatients = (): PatientEntry[] => {
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

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getNonSensitivePatientData,
  addPatient,
};