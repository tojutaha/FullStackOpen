import patients from '../../data/patients';
import { Patient, PatientEntry, NewPatientEntry, NonSensitivePatientData } from '../../../shared/types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
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

  patients.push(newPatientEntry as Patient);
  return newPatientEntry;
};

export default {
  getPatients,
  getNonSensitivePatientData,
  addPatient,
};