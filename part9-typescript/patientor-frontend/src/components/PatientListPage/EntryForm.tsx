import { Add, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  BaseEntryWithoutId,
  Discharge,
  EntryWithoutId,
  Patient,
  SickLeave,
} from "../../types";
import patientService from "../../services/patients";
import axios from "axios";
import { assertNever } from "../../utility/assertNever";

interface EntryFormProps {
  id: string | undefined;
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  notify: (msg: string) => void;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

type EntryType = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

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
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");

  // HealthCheck specific
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

  //   Hospital specific
  const [discharge, setDischarge] = useState<Discharge>({
    date: "",
    criteria: "",
  });

  //   OccupationalHealthcare specific
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeave, setSickLeave] = useState<SickLeave>({
    startDate: "",
    endDate: "",
  });

  const resetForm = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagnosisCodes("");
    setHealthCheckRating(0);
    setDischarge({ date: "", criteria: "" });
    setEmployerName("");
    setSickLeave({
      startDate: "",
      endDate: "",
    });
  };

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

    let newEntry: EntryWithoutId;

    const baseEntry: BaseEntryWithoutId = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.split(", "),
    };

    switch (entryType) {
      case "HealthCheck":
        newEntry = {
          type: "HealthCheck",
          ...baseEntry,
          healthCheckRating,
        };
        break;
      case "Hospital":
        newEntry = {
          type: "Hospital",
          ...baseEntry,
          discharge,
        };
        break;
      case "OccupationalHealthcare":
        newEntry = {
          type: "OccupationalHealthcare",
          ...baseEntry,
          employerName,
          sickLeave,
        };
        break;
      default:
        return assertNever(entryType);
    }

    try {
      if (id && patient) {
        const data = await patientService.createEntry(id, newEntry);
        setPatient({ ...patient, entries: [...patient.entries, data] });
        notify("Entry added successfully.");
        resetForm();
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
        gap: 1.5,
        border: "2px dashed #ccc",
        borderRadius: 1,
        padding: 2,
        mt: 2,
      }}
    >
      <Typography variant="h6">New Entry</Typography>
      <FormControl sx={{ mt: 2 }}>
        <InputLabel id="entry-type-label">Entry Type</InputLabel>
        <Select
          value={entryType}
          label="Entry Type"
          onChange={({ target }) => setEntryType(target.value as EntryType)}
        >
          <MenuItem value="HealthCheck">HealthCheck</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">
            OccupationalHealthcare
          </MenuItem>
        </Select>
      </FormControl>
      {/* Common fields */}
      <TextField
        type="text"
        label="Description"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <TextField
        type="date"
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField
        type="text"
        label="Specialist"
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <TextField
        type="text"
        label="Diagnosis Codes"
        value={diagnosisCodes}
        onChange={({ target }) => setDiagnosisCodes(target.value)}
      />

      {/* HealthCheck */}
      {entryType === "HealthCheck" && (
        <TextField
          type="number"
          label="HealthCheck Rating"
          value={healthCheckRating}
          // inputProps={{ min: 0, max: 3, step: 1 }}
          onChange={({ target }) => setHealthCheckRating(Number(target.value))}
        />
      )}
      {/* Hospital */}
      {entryType === "Hospital" && (
        <>
          <TextField
            label="Discharge Date"
            value={discharge.date}
            onChange={({ target }) =>
              setDischarge({ ...discharge, date: target.value })
            }
          />
          <TextField
            label="Discharge Criteria"
            value={discharge.criteria}
            onChange={({ target }) =>
              setDischarge({ ...discharge, criteria: target.value })
            }
          />
        </>
      )}

      {/* OccupationalHealthcare */}
      {entryType === "OccupationalHealthcare" && (
        <>
          <TextField
            label="Employer Name"
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />
          <TextField
            label="Sickleave Start Date"
            value={sickLeave.startDate}
            onChange={({ target }) =>
              setSickLeave({ ...sickLeave, startDate: target.value })
            }
          />
          <TextField
            label="Sickleave End Date"
            value={sickLeave.endDate}
            onChange={({ target }) =>
              setSickLeave({ ...sickLeave, endDate: target.value })
            }
          />
        </>
      )}

      {/* Buttons */}
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
