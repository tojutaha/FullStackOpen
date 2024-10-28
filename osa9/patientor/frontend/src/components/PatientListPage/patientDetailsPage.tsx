import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from '../../services/patients';
import { Patient, Gender, Diagnosis } from "../../../../shared/types";
import { Male as MaleIcon, Female as FemaleIcon, Transgender as OtherIcon } from '@mui/icons-material';
import getDiagnose from "../../services/diagnosesService";

const PatientDetailsPage = () => {

  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (id) {
          const patient = await patientService.getPatient(id);
          if(patient) {
            setPatient(patient);

            const allDiagnosisCodes = patient.entries.flatMap(entry => entry.diagnosisCodes || []);
            // const uniqueDiagnosisCodes = [...new Set(allDiagnosisCodes)];
            // const diagnosesData = await Promise.all(
            //   uniqueDiagnosisCodes.map(code => getDiagnose(code))
            // );
            const diagnosesData = await Promise.all(
              allDiagnosisCodes.map(code => getDiagnose(code))
            );

            setDiagnoses(diagnosesData);
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
            {patient.entries && patient.entries.length > 0 && patient.entries.map((entry) => (
              <div key={entry.id}>
                <p>{entry.date} <i>{entry.description}</i></p>
                {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                  <ul>
                    {entry.diagnosisCodes.map((code) => {
                      const diagnosis = diagnoses.find(d => d.code === code);
                      return (
                        <li key={code}>
                          {code} {diagnosis ? ` ${diagnosis.name}` : ''}
                          </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
};

export default PatientDetailsPage;