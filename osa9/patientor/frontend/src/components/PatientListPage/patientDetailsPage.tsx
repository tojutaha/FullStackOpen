import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from '../../services/patients';
import { Patient, Gender  } from "../../../../shared/types";
import { Male as MaleIcon, Female as FemaleIcon, Transgender as OtherIcon } from '@mui/icons-material';
import { Grid, Button, TextField, InputLabel } from "@mui/material";
import EntryDetails from "./EntryDetails";
import { Card, Typography } from '@mui/material';
import diagnosesService from "../../services/diagnosesService";
import { EntryWithoutId } from "../../../../shared/types";

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

  const addEntry = async () => {
    const newEntry: EntryWithoutId = {
      date: date,
      type: "Hospital",
      specialist: specialist,
      description: description,
      discharge: {
        date: "2024-10-30",
        criteria: "Everything went better than expected",
      }
    };

    await diagnosesService.addEntry(id, newEntry);
    // const result = await diagnosesService.addEntry(id, newEntry);
    // console.log("result: ", result);
  };

  return (
    <>
      <form onSubmit={addEntry}>
        <Card variant="outlined" style={{ marginBottom: '1em', padding: '1em' }}>

          <Typography variant="h4">New HealthCheck entry</Typography>

            <InputLabel style={{ marginTop: 20 }}>Description</InputLabel>
            <TextField
              label=""
              fullWidth
              onChange={({ target }) => setDescription(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
            <TextField
              label=""
              fullWidth
              onChange={({ target }) => setDate(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>Specialist</InputLabel>
            <TextField
              label=""
              fullWidth
              onChange={({ target }) => setSpecialist(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>Healthcheck Rating</InputLabel>
            <TextField
              label=""
              fullWidth
              onChange={({ target }) => setHealthcheckRating(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>Diagnosis codes</InputLabel>
            <TextField
              label=""
              fullWidth
              onChange={({ target }) => setDiagnosisCodes(target.value)}
            />

          <Grid>
            <Grid item>
              <Button
                color="error"
                variant="contained"
                style={{ float: "left" }}
                type="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                type="submit"
                style={{ float: "right" }}
              >
                Add
              </Button>
            </Grid>
          </Grid>

        </Card>
      </form>
    </>
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