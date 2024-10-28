import { Entry, HealthCheckRating } from '../../../../shared/types';
import { Card, Typography } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <Card variant="outlined" style={{ marginBottom: '1em', padding: '1em' }}>
          <Typography variant="subtitle1">
            {entry.date} <LocalHospitalIcon />
          </Typography>
          <Typography variant="body2" style={{ fontStyle: 'italic' }}>
            {entry.description}
          </Typography>
          <Typography variant="body2">
            Diagnose by {entry.specialist}
          </Typography>
          {entry.discharge && (
            <Typography variant="body2">
              Discharge: {entry.discharge.date} - {entry.discharge.criteria}
            </Typography>
          )}
        </Card>
      );

    case "OccupationalHealthcare":
      return (
        <Card variant="outlined" style={{ marginBottom: '1em', padding: '1em' }}>
          <Typography variant="subtitle1">
            {entry.date} <WorkIcon /> {entry.employerName}
          </Typography>
          <Typography variant="body2" style={{ fontStyle: 'italic' }}>
            {entry.description}
          </Typography>
          <Typography variant="body2">
            Diagnose by {entry.specialist}
          </Typography>
          {entry.sickLeave && (
            <Typography variant="body2">
              Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
            </Typography>
          )}
        </Card>
      );

    case "HealthCheck":
      return (
        <Card variant="outlined" style={{ marginBottom: '1em', padding: '1em' }}>
          <Typography variant="subtitle1">
            {entry.date} <FavoriteIcon style={{ color: getHeartColor(entry.healthCheckRating) }} />
          </Typography>
          <Typography variant="body2" style={{ fontStyle: 'italic' }}>
            {entry.description}
          </Typography>
          <Typography variant="body2">
            Diagnose by {entry.specialist}
          </Typography>
        </Card>
      );

    default:
      return assertNever(entry);
  }
};

const getHeartColor = (rating: HealthCheckRating) => {
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
      return "grey";
  }
};

export default EntryDetails;
