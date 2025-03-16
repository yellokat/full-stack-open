import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import patientService from '../../services/patients';
import {Gender, Patient} from "../../types.ts";
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientPage = () => {
    const id: string = useParams().id as string;
    const [patient, setPatient] = useState<Patient>();
    useEffect(() => {
        patientService.findById(id).then((patient: Patient) => setPatient(patient));
    }, []);

    if (!patient) {
        return null;
    }

    const GenderIcon = ({gender}:{gender:Gender}) => {
        switch (gender) {
            case Gender.Male:
                return <MaleIcon/>;
            case Gender.Female:
                return <FemaleIcon/>;
            default:
                return <TransgenderIcon/>;
        }
    };

    return (<>
        <h2>{patient.name} <GenderIcon gender={patient.gender}/></h2>
        <span>ssn: {patient.ssn}</span><br/>
        <span>occupation: {patient.occupation}</span>
    </>);


};

export default PatientPage;