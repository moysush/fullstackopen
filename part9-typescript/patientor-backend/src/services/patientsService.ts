import patients from "../../data/patients";
import { NewPatientEntry, NonSensitivePatient, Patient } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = () => {
  return patients;
};

const getNonSensitivePatient = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

const addPatient = (object: NewPatientEntry): Patient => {
  const newPatient = { id: uuid().toString(), ...object, entries: [] };
  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string) => {
  const patientExist = patients.find((p) => p.id === id);
  return patientExist;
};

export default { getPatients, getNonSensitivePatient, addPatient, findById };
