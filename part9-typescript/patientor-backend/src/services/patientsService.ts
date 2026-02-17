import patients from "../../data/patients";
import { Patient, PatientDataWithoutSsn } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = () => {
  return patients;
};

const getPatientsWithoutSsn = (): PatientDataWithoutSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

const addPatient = (object: Patient): Patient => {
  const newPatient = { ...object, id: uuid().toString() };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, getPatientsWithoutSsn, addPatient };
