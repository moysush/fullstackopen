import { Add, Close } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { EntryWithoutId, Patient } from "../../types";
import patientService from "../../services/patients";
import axios from "axios";

interface EntryFormProps {
  id: string | undefined;
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  notify: (msg: string) => void;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const EntryForm = ({
  id,
  patient,
  setPatient,
  notify,
  setShowForm,
}: EntryFormProps) => {
  // new healthcheck entry states
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");

  // creating new entry
  const onCreateEntry = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (
      !description ||
      !date ||
      healthCheckRating === undefined ||
      !specialist
    ) {
      return notify("Error: Missing fields or incorrect data.");
    }

    const newEntry: EntryWithoutId = {
      type: "HealthCheck",
      description,
      date,
      healthCheckRating,
      specialist,
      diagnosisCodes: diagnosisCodes.split(", "),
    };
    try {
      if (id && patient) {
        const data = await patientService.createEntry(id, newEntry);
        setPatient({ ...patient, entries: [...patient.entries, data] });
        notify("Entry added.");
        // reset states
        setDescription("");
        setDate("");
        setHealthCheckRating(0);
        setSpecialist("");
        setDiagnosisCodes("");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error
          .map(
            (e: { path: string; message: string }) => e.path + " " + e.message,
          )
          .join(", ");
        notify(`Error: ${errorMessage ? errorMessage : "Unknown error."}`);
      } else {
        notify("Error: Unknown error.");
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={onCreateEntry}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        border: "2px dashed #ccc",
        borderRadius: 1,
        padding: 2,
        mt: 2,
      }}
    >
      <Typography variant="h6">New HealthCheck Entry</Typography>
      <TextField
        type="text"
        placeholder="Description"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <TextField
        type="date"
        placeholder="Date"
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField
        type="number"
        placeholder="HealthCheck Rating"
        value={healthCheckRating}
        // inputProps={{ min: 0, max: 3, step: 1 }}
        onChange={({ target }) => setHealthCheckRating(Number(target.value))}
      />
      <TextField
        type="text"
        placeholder="Specialist"
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <TextField
        type="text"
        placeholder="Diagnosis Codes"
        value={diagnosisCodes}
        onChange={({ target }) => setDiagnosisCodes(target.value)}
      />
      <div style={{ marginTop: "1em", display: "flex", gap: "1em" }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<Close />}
          onClick={() => setShowForm(false)}
        >
          CANCEL
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<Add />}
        >
          ADD
        </Button>
      </div>
    </Box>
  );
};

export default EntryForm;
