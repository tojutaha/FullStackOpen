import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { PatientEntry } from '../../../shared/types';

const getDiagnose = async (code: string) => {
    const { data } = await axios.get(`${apiBaseUrl}/diagnoses/${code}`);
    return data;
};

const addEntry = async (id: string, entryData: Omit<PatientEntry, 'id'>) => {
  const { data } = await axios.post(`/api/patients/${id}/entries`, entryData);
  return data;
};

export default {
     getDiagnose,
     addEntry,
};