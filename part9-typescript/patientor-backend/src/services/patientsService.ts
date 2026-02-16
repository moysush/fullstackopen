import patients from "../../data/patients";
import { PatientDataWithoutSsn } from "../types";

const getPatients = () => {
  return patients;
};

const getPatientsWithoutSsn = (): PatientDataWithoutSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

export default { getPatients, getPatientsWithoutSsn };
