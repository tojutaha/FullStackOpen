import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from '../../services/patients';
import { Patient, Gender, /*Diagnosis*/ } from "../../../../shared/types";
import { Male as MaleIcon, Female as FemaleIcon, Transgender as OtherIcon } from '@mui/icons-material';
import { Button } from "@mui/material";
// import getDiagnose from "../../services/diagnosesService";
import EntryDetails from "./EntryDetails";

const PatientDetailsPage = () => {

  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  // const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (id) {
          const patient = await patientService.getPatient(id);
          if(patient) {
            setPatient(patient);

            // const allDiagnosisCodes = patient.entries.flatMap(entry => entry.diagnosisCodes || []);
            // const diagnosesData = await Promise.all(
            //   allDiagnosisCodes.map(code => getDiagnose(code))
            // );

            // setDiagnoses(diagnosesData);
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

  // console.log(diagnoses);

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
          <h3>entries: </h3>
          <ul>
            {patient.entries && patient.entries.map((entry) => (
              <EntryDetails key={entry.id} entry={entry} />
            ))}
          </ul>
          <form>
            <Button type="submit" variant="contained">ADD NEW ENTRY</Button>
          </form>
        </div>
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
};

export default PatientDetailsPage;