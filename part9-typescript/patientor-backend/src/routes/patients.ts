import express from "express";
import patientsService from "../services/patientsService";
import toNewPatientEntry from "../utils";
import z from "zod";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitivePatient());
});

router.get("/:id", (req, res) => {
  try {
    const patient = patientsService.findById(req.params.id);
    if (!patient) {
      throw new Error("Patient not found");
    }
    res.send(patient);
  } catch (error) {
    res
      .status(400)
      .json({
        error: error instanceof Error ? error.message : "unknown error",
      });
  }
});

router.post("/", (req, res) => {
  try {
    // type guard and validator
    const newPatientEntry = toNewPatientEntry(req.body);
    // adding patient in the database and getting an id for the patient
    const addedPatient = patientsService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error) {
    res.status(400).json({
      error: error instanceof z.ZodError ? error.issues : "Unknown error",
    });
  }
});

export default router;
