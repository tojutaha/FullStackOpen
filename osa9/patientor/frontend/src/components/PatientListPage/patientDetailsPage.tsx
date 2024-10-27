import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from '../../services/patients';
import { Patient, Gender } from "../../../../shared/types";
import { Icon } from "@mui/material";
import { Male as MaleIcon, Female as FemaleIcon, Transgender as OtherIcon } from '@mui/icons-material';

const PatientDetailsPage = () => {

    const { id } = useParams();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                if(id) {
                    const patient = await patientService.getPatient(id);
                    setPatient(patient);
                }
            } catch(error: unknown) {
                let errorMessage = "Something went wrong.";
                if(error instanceof Error) {
                    errorMessage += error.message;
                }
                setError(`Unable to find patient: ${errorMessage}`);
            }
        };

        fetchPatient();
    }, [id]);

    if(error) {
        return (
            <div>
                {error}
            </div>
        );
    }
    
    const renderGender = () => {
        switch(patient?.gender) {
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
                </div>
            ) : (
                <p>Loading..</p>
            )}
        </div>
    );
};

export default PatientDetailsPage;