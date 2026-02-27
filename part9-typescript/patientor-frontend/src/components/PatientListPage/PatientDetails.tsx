import { useParams } from "react-router-dom";
import { Diagnosis, EntryWithoutId, Patient } from "../../types";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { useEffect, useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryDetails from "./EntryDetails";
import { Add, Close } from "@mui/icons-material";
import axios from "axios";

interface PatientDetailsProps {
  notify: (msg: string) => void;
}

const PatientDetails = ({ notify }: PatientDetailsProps) => {
  // even if i don't use type | undefined, typescript auto assigns undefined if the initial value is empty
  const { id } = useParams<string>();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  // new healthcheck entry states
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  // fetching patient details
  useEffect(() => {
    // narrows the id type to string if it exists
    if (id) {
      patientService.findById(id).then((res) => setPatient(res));
      diagnosesService.getAllDiagnoses().then((res) => setDiagnoses(res));
    }
  }, [id]);

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
      diagnosisCodes,
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
        setDiagnosisCodes([]);
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

  // narrows the patient to defined Patient
  if (!patient) {
    return <Typography>Patient not found...</Typography>;
  }
  // narrows the diagnoses type excluding undefined
  if (!diagnoses) {
    return null;
  }

  return (
    <div>
      <div id="patient">
        <Typography
          variant="h4"
          sx={{ mt: 2, mb: 1, display: "flex", alignItems: "center", gap: 1 }}
        >
          {patient.name}
          {patient.gender === "male" ? (
            <MaleIcon sx={{ fontSize: "inherit" }} />
          ) : patient.gender === "female" ? (
            <FemaleIcon sx={{ fontSize: "inherit" }} />
          ) : (
            <TransgenderIcon sx={{ fontSize: "inherit" }} />
          )}
        </Typography>
        <Typography variant="body1">
          <strong>SSN: </strong>
          {patient.ssn}
        </Typography>
        <Typography variant="body1">
          <strong>Occupation: </strong>
          {patient.occupation}
        </Typography>
      </div>
      <div>
        {showForm && (
          <Box
            component="form"
            onSubmit={onCreateEntry}
            sx={{ display: "flex", flexDirection: "column", gap: 0.5, border: "2px dashed #ccc", borderRadius: 1, padding: 2, mt: 2 }}
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
              onChange={({ target }) =>
                setHealthCheckRating(Number(target.value))
              }
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
              onChange={({ target }) =>
                setDiagnosisCodes(target.value.split(", "))
              }
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
        )}
      </div>
      <div id="Entries">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ mt: 2 }}>
            <strong>Entries</strong>
          </Typography>
          {!showForm && (
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => setShowForm(true)}
              startIcon={<Add />}
            >
              ADD NEW ENTRY
            </Button>
          )}
        </div>
        {patient.entries.length === 0
          ? "No entries yet..."
          : patient.entries.map((e) => {
              return (
                <Paper
                  key={e.id}
                  sx={{ p: 2, mt: 2, "&:hover": { boxShadow: 8 } }}
                  elevation={3}
                >
                  <EntryDetails entry={e} diagnoses={diagnoses} />
                </Paper>
              );
            })}
      </div>
    </div>
  );
};

export default PatientDetails;
