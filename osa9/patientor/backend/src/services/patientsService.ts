import data from '../../data/patients';
import { NewPatientEntry, Patient, NonSensitivePatientData } from '../../../frontend/src/types';
import { v1 as uuid } from 'uuid';

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

const addPatient = (entry: NewPatientEntry): NewPatientEntry => {
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