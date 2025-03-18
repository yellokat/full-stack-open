import React, {ReactElement, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';
import {Diagnosis, Entry, Gender, Patient} from "../../types/types.ts";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import {Box, Button} from "@mui/material";
import {assertNever} from "../../utils/helper.ts";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import AddEntryModal from "../AddEntryModal";
import {EntrySchema} from "../../types/schemas.ts";
import {
    validateHealthCheckEntry,
    validateHospitalEntry,
    validateOccupationalHealthcareEntry
} from "../../utils/validators.ts";

const PatientPage = ():ReactElement => {
    const id: string = useParams().id as string;
    const [modalOpen, setModalOpen] = useState<boolean>(false);
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
        return <></>;
    }

    const GenderIcon = ({gender}: { gender: Gender }):ReactElement => {
        switch (gender) {
            case Gender.Male:
                return <MaleIcon/>;
            case Gender.Female:
                return <FemaleIcon/>;
            default:
                return <TransgenderIcon/>;
        }
    };

    const DiagnosisIcon = ({entry}: { entry: Entry }):ReactElement => {
        switch (entry.type) {
            case "HealthCheck":
                return <SearchIcon/>;
            case "Hospital":
                return <LocalHospitalIcon/>;
            case "OccupationalHealthcare":
                return <WorkIcon/>;
            default:
                return assertNever(entry);
        }
    };

    const HealthCheckIcons = ({entry}: { entry: Entry }):ReactElement => {
        if (entry.type === "HealthCheck") {
            let rating: number = entry.healthCheckRating;
            if (3 < rating) {
                rating = 3;
            }
            if (rating < 0) {
                rating = 0;
            }
            const nFilledHearts = 4 - rating;
            const nEmptyHearts = rating;
            const filledHearts:ReactElement[] = [...Array(nFilledHearts)].map((_, index:number) => {
                return <FavoriteIcon key={index}/>;
            });
            const emptyHearts:ReactElement[] = [...Array(nEmptyHearts)].map((_, index:number) => {
                return <FavoriteBorderIcon key={nFilledHearts + index}/>;
            });
            return (<>
                {[...filledHearts, ...emptyHearts]}<br/>
            </>);
        } else {
            return <></>;
        }
    };

    const DischargeInfo = ({entry}: {entry:Entry}):ReactElement => {
        if (entry.type === "Hospital") {
            return (<span>
                Discharged at {entry.discharge.date}, {entry.discharge.criteria}
            </span>);
        } else{
            return <></>;
        }
    };

    const DiagnosisEntry = ({entry}: { entry: Entry }):ReactElement => {
        const employerName: string = (entry.type === "OccupationalHealthcare") ? entry.employerName : "";
        return (<>
            <span>{entry.date} <DiagnosisIcon entry={entry}/> {employerName}</span><br/>
            <span><i>{entry.description}</i></span><br/>
            <HealthCheckIcons entry={entry}/>
            <span>Diagnosed by {entry.specialist}</span><br/>
            {
                (!entry.diagnosisCodes) ? null :
                    <ul>
                        {
                            entry.diagnosisCodes.map(diagnosisCode => {
                                const targetDiagnosis = diagnoses.find((e) => e.code === diagnosisCode)!;
                                return (<li key={diagnosisCode}>{diagnosisCode} {targetDiagnosis.name}</li>);
                            })
                        }
                    </ul>
            }
            <DischargeInfo entry={entry}/>
        </>);
    };

    const handleClick = (event:React.SyntheticEvent) => {
        event.preventDefault();
        setModalOpen(true);
    };

    const closeModal = (): void => {
        setModalOpen(false);
    };

    const handleCreateEntryCallback = (data:Entry):void => {
        // error if parameters are missing
        let entry:Entry = EntrySchema.parse(data);

        // remove excess parameters
        switch(entry.type){
            case "Hospital":
                entry = validateHospitalEntry(entry);
                break;
            case "OccupationalHealthcare":
                entry = validateOccupationalHealthcareEntry(entry);
                break;
            case "HealthCheck":
                entry = validateHealthCheckEntry(entry);
                break;
            default:
                return assertNever(entry);
        }

        // append entry to target patient (locally)
        patient.entries.push(entry);
    };

    return (<>
        <h2>{patient.name} <GenderIcon gender={patient.gender}/></h2>
        <span>ssn: {patient.ssn}</span><br/>
        <span>occupation: {patient.occupation}</span>
        <h3>entries</h3>
        <Button variant={"contained"} onClick={handleClick}>Add entry</Button>
        {patient.entries.map((entry: Entry) => {
            return (
                <Box
                    key={entry.id}
                    sx={{
                        padding: "10px 5px",
                        border: `2px solid black`,
                        borderRadius: "8px",
                        flexDirection: "column",
                        margin: "5px 0px"
                    }}
                >
                    <DiagnosisEntry entry={entry}/>
                </Box>
            );
        })}
        <AddEntryModal
            patientId={patient.id}
            modalOpen={modalOpen}
            onClose={closeModal}
            handleCreateEntryCallback={handleCreateEntryCallback}
        />
    </>);


};

export default PatientPage;