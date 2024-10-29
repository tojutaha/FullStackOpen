import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from '../../services/patients';
import { Patient, Gender  } from "../../../../shared/types";
import { Male as MaleIcon, Female as FemaleIcon, Transgender as OtherIcon } from '@mui/icons-material';
import { Grid, Button, TextField, InputLabel, Card, Select, MenuItem, Typography } from "@mui/material";
import EntryDetails from "./EntryDetails";
import diagnosesService from "../../services/diagnosesService";
import { EntryWithoutId, HealthCheckRating } from "../../../../shared/types";

interface Props {
  onCancel: () => void;
  id: string;
}

const EntryForm = ({ onCancel, id }: Props) => {

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthcheckRating, setHealthcheckRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [type, setType] = useState<"Hospital" | "OccupationalHealthcare" | "HealthCheck">("Hospital");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const addEntry = async () => {
    let newEntry: EntryWithoutId;

    switch (type) {
      case "Hospital":
        newEntry = {
          date,
          type,
          specialist,
          description,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        break;
      case "OccupationalHealthcare":
        newEntry = {
          date,
          type,
          specialist,
          description,
          employerName,
          sickLeave: sickLeaveStart && sickLeaveEnd ? { startDate: sickLeaveStart, endDate: sickLeaveEnd } : undefined,
        };
        break;
      case "HealthCheck":
        newEntry = {
          date,
          type,
          specialist,
          description,
          healthCheckRating: parseInt(healthcheckRating) as HealthCheckRating,
        };
        break;
      default:
        throw new Error("Unsupported entry type");
    }

    await diagnosesService.addEntry(id, newEntry);
  };

  return (
    <form onSubmit={addEntry}>
      <Card variant="outlined" style={{ marginBottom: '1em', padding: '1em' }}>
        <Typography variant="h4">New Entry</Typography>

        <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value as any)} fullWidth>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
          <MenuItem value="HealthCheck">Health Check</MenuItem>
        </Select>

        <InputLabel style={{ marginTop: 20 }}>Description</InputLabel>
        <TextField fullWidth onChange={({ target }) => setDescription(target.value)} />
        <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
        <TextField fullWidth onChange={({ target }) => setDate(target.value)} />
        <InputLabel style={{ marginTop: 20 }}>Specialist</InputLabel>
        <TextField fullWidth onChange={({ target }) => setSpecialist(target.value)} />

        {type === "HealthCheck" && (
          <>
            <InputLabel style={{ marginTop: 20 }}>Health Check Rating</InputLabel>
            <TextField fullWidth onChange={({ target }) => setHealthcheckRating(target.value)} />
          </>
        )}

        {type === "Hospital" && (
          <>
            <InputLabel style={{ marginTop: 20 }}>Discharge Date</InputLabel>
            <TextField fullWidth onChange={({ target }) => setDischargeDate(target.value)} />
            <InputLabel style={{ marginTop: 20 }}>Discharge Criteria</InputLabel>
            <TextField fullWidth onChange={({ target }) => setDischargeCriteria(target.value)} />
          </>
        )}

        {type === "OccupationalHealthcare" && (
          <>
            <InputLabel style={{ marginTop: 20 }}>Employer Name</InputLabel>
            <TextField fullWidth onChange={({ target }) => setEmployerName(target.value)} />
            <InputLabel style={{ marginTop: 20 }}>Sick Leave Start Date</InputLabel>
            <TextField fullWidth onChange={({ target }) => setSickLeaveStart(target.value)} />
            <InputLabel style={{ marginTop: 20 }}>Sick Leave End Date</InputLabel>
            <TextField fullWidth onChange={({ target }) => setSickLeaveEnd(target.value)} />
          </>
        )}

        <Grid>
          <Grid item>
            <Button color="error" variant="contained" style={{ float: "left" }} type="button" onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit" style={{ float: "right" }}>
              Add
            </Button>
          </Grid>
        </Grid>
      </Card>
    </form>
  );
};

const PatientDetailsPage = () => {

  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showEntryForm, setShowEntryForm] = useState(false);

  const toggleForm = () => {
    setShowEntryForm(prev => !prev);
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (id) {
          const patient = await patientService.getPatient(id);
          if(patient) {
            setPatient(patient);
          }
        }
      } catch (error: unknown) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
          errorMessage += error.message;
        }
        setError(`Unable to find patient: ${errorMessage}`);
      }
    };

    fetchPatient();
  }, [id]);

  if (error) {
    return (
      <div>
        {error}
      </div>
    );
  }

  const renderGender = () => {
    switch (patient?.gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      case Gender.Other:
        return <OtherIcon />;
      default:
        return null;
    }
  };

  return (
    <div>
      {patient ? (
        <div>
          <h3>{patient.name} {renderGender()} </h3>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          {showEntryForm && <EntryForm onCancel={toggleForm} id={patient.id} />}
          <h3>entries: </h3>
          <ul>
            {patient.entries && patient.entries.map((entry) => (
              <EntryDetails key={entry.id} entry={entry} />
            ))}
          </ul>
          <form>
            <Button type="button" variant="contained" onClick={toggleForm}>ADD NEW ENTRY</Button>
          </form>
        </div>
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
};

export default PatientDetailsPage;