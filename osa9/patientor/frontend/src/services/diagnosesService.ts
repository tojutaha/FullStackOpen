import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { EntryWithoutId, Diagnosis } from '../../../shared/types';

const getAllDiagnoses = async (): Promise<Diagnosis[]> => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return data;
};

const getDiagnose = async (code: string) => {
    const { data } = await axios.get(`${apiBaseUrl}/diagnoses/${code}`);
    return data;
};

const addEntry = async (id: string, entryData: EntryWithoutId) => {
  const { data } = await axios.post(`${apiBaseUrl}/patients/${id}/entries`, entryData);
  return data;
};

export default {
  getAllDiagnoses,
  getDiagnose,
  addEntry,
};