import z from "zod";
import { NewPatientSchema } from "./utils";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient extends NewPatientEntry {
  id: string;
  // name: string;
  // dateOfBirth: string;
  // ssn: string;
  // gender: Gender;
  // occupation: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type PatientDataWithoutSsn = Omit<Patient, "ssn">;
export type NewPatientEntry = z.infer<typeof NewPatientSchema>;
