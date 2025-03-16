import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';
import {Diagnosis, Entry, Gender, Patient} from "../../types.ts";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientPage = () => {
    const id: string = useParams().id as string;
    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
    useEffect(() => {
        patientService.findById(id).then((patient: Patient) => setPatient(patient));
    }, []);
    useEffect(() => {
        diagnosisService.getAll().then((diagnoses: Diagnosis[]) => {
            setDiagnoses(diagnoses);
        });
    }, []);

    if (!patient || !diagnoses) {
        return null;
    }

    const GenderIcon = ({gender}: { gender: Gender }) => {
        switch (gender) {
            case Gender.Male:
                return <MaleIcon/>;
            case Gender.Female:
                return <FemaleIcon/>;
            default:
                return <TransgenderIcon/>;
        }
    };

    const DiagnosisEntry = ({entry}: { entry: Entry }) => {
        return (<>
            <span>{entry.date} {entry.description}</span><br/>
            {
                (!entry.diagnosisCodes) ? null :
                    <ul>
                        {
                            entry.diagnosisCodes.map(diagnosisCode => {
                                const targetDiagnosis = diagnoses.find((e)=>e.code===diagnosisCode)!;
                                return (<li>{diagnosisCode} {targetDiagnosis.name}</li>);
                            })
                        }
                    </ul>
            }
        </>);
    };

    return (<>
        <h2>{patient.name} <GenderIcon gender={patient.gender}/></h2>
        <span>ssn: {patient.ssn}</span><br/>
        <span>occupation: {patient.occupation}</span>
        <h3>entries</h3>
        {patient.entries.map((entry: Entry) => {
            return (<li key={entry.id}><DiagnosisEntry entry={entry}/></li>);
        })}
    </>);


};

export default PatientPage;