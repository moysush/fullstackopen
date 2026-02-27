import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { useEffect, useState } from "react";
import { Button, Paper, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryDetails from "./EntryDetails";
import { Add } from "@mui/icons-material";
import EntryForm from "./EntryForm";

interface PatientDetailsProps {
  notify: (msg: string) => void;
}

const PatientDetails = ({ notify }: PatientDetailsProps) => {
  // even if i don't use type | undefined, typescript auto assigns undefined if the initial value is empty
  const { id } = useParams<string>();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const [showForm, setShowForm] = useState<boolean>(false);

  // fetching patient details
  useEffect(() => {
    // narrows the id type to string if it exists
    if (id) {
      patientService.findById(id).then((res) => setPatient(res));
      diagnosesService.getAllDiagnoses().then((res) => setDiagnoses(res));
    }
  }, [id]);

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
      <div id="EntryForm">
        {showForm && (
          <EntryForm
            id={id}
            patient={patient}
            setPatient={setPatient}
            notify={notify}
            setShowForm={setShowForm}
          />
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
