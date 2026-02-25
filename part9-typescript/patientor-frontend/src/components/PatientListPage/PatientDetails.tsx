import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

const PatientDetails = () => {
  const { id } = useParams<string>();
  const [patient, setPatient] = useState<Patient | undefined>();

  useEffect(() => {
    // narrows the id type to string if it exists
    if (id) {
      patientService.findById(id).then((res) => setPatient(res));
    }
  }, [id]);

  // narrows the patient to defined Patient
  if (!patient) {
    return <Typography>Patient not found...</Typography>;
  }

  return (
    <div>
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
      <Typography variant="h6" sx={{ mt: 2 }}>
        <strong>Entries</strong>
      </Typography>
      {patient.entries.length === 0
        ? "No entries yet..."
        : patient.entries.map((e) => {
            return (
              <div>
                <Typography>{e.date}</Typography>
                <Typography>{e.description}</Typography>
                <ul>
                  {e.diagnosisCodes?.map((c) => {
                    return <li>{c}</li>;
                  })}
                </ul>
              </div>
            );
          })}
    </div>
  );
};

export default PatientDetails;
