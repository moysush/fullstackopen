import axios from "axios";
import { EntryWithoutId, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  return data;
};

const findById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const createPatient = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);
  return data;
};

const createEntry = async (id: string, object: EntryWithoutId) => {
  const { data } = await axios.post(`${apiBaseUrl}/patients/${id}/entries`, object);
  return data;
};

export default {
  getAll,
  findById,
  createPatient,
  createEntry,
};
