import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import { Diagnosis, Entry } from "../../types";
import { Typography } from "@mui/material";
import { assertNever } from "../../utility/assertNever";

const getHealthRatingColor = (rating: number) => {
  switch (rating) {
    case 0:
      return "green";
    case 1:
      return "yellow";
    case 2:
      return "orange";
    case 3:
      return "red";
    default:
      console.warn('Unexpected health rating:', rating);
      return "inherit";
  }
};

interface EntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

interface EntryWrapperProps {
  entry: Entry;
  icon: React.ReactNode;
  diagnoses: Diagnosis[];
  children?: React.ReactNode;
}

const EntryWrapper = ({
  entry,
  icon,
  diagnoses,
  children,
}: EntryWrapperProps) => (
  <div>
    <Typography
      sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
      variant="h6"
    >
      {entry.date} {icon}{" "}
      {entry.type === "OccupationalHealthcare" ? entry.employerName : null}
    </Typography>
    <Typography>
      <i>{entry.description}</i>
    </Typography>
    {entry.diagnosisCodes && (
      <ul>
        {entry.diagnosisCodes.map((c) => {
          return (
            <li key={c}>
              {c} {diagnoses?.find((d) => d.code === c)?.name}
            </li>
          );
        })}
      </ul>
    )}
    {children}
    <Typography sx={{ mt: 1 }}>Diagnosed by {entry.specialist}</Typography>
  </div>
);

const EntryDetails = ({ entry, diagnoses }: EntryProps) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <EntryWrapper
          entry={entry}
          icon={<LocalHospitalIcon />}
          diagnoses={diagnoses}
        >
          <Typography>
            Discharge: {entry.discharge.date} - {entry.discharge.criteria}
          </Typography>
        </EntryWrapper>
      );
    case "HealthCheck":
      return (
        <EntryWrapper
          entry={entry}
          icon={<HealthAndSafetyIcon />}
          diagnoses={diagnoses}
        >
          <Typography>
            {
              <FavoriteIcon
                sx={{ color: getHealthRatingColor(entry.healthCheckRating) }}
              />
            }
          </Typography>
        </EntryWrapper>
      );
    case "OccupationalHealthcare":
      return (
        <EntryWrapper
          entry={entry}
          icon={<MedicalInformationIcon />}
          diagnoses={diagnoses}
        >
          {entry.sickLeave && (
            <Typography>
              Sickleave: {entry.sickLeave?.startDate} -{" "}
              {entry.sickLeave?.endDate}
            </Typography>
          )}
        </EntryWrapper>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
