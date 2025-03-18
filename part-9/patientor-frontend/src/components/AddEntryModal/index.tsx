import {
    Dialog,
    DialogTitle,
    DialogContent,
    Divider,
    Alert,
    Radio,
    RadioGroup,
    FormControlLabel,
    SelectChangeEvent,
    Button,
    Box
} from '@mui/material';

import React, {useState} from "react";
import CommonEntryForm from "./CommonEntryForm";
import Notification from '../Notification';
import {ZodError} from "zod";
import axios from "axios";
import patientService from '../../services/patients';
import {Entry, EntryType} from "../../types/types.ts";
import {TypeSpecificEntryFormProps} from "./typeSpecificEntryForm/propTypes.ts";
import {CommonEntryFormProps} from "./CommonEntryForm/propTypes.ts";
import TypeSpecificContent from "./typeSpecificEntryForm";

interface Props {
    patientId: string;
    modalOpen: boolean;
    onClose: () => void;
    handleCreateEntryCallback: (createdEntry: Entry) => void;
    error?: string;
}

const AddEntryModal = ({patientId, modalOpen, onClose, handleCreateEntryCallback, error}: Props) => {
    // error message
    const [errorMessage, setErrorMessage] = useState<string>("");

    // type state
    const [selectedValue, setSelectedValue] = useState<EntryType>("Hospital");

    // common fields
    const [description, setDescription] = useState<string|null>(null);
    const [specialist, setSpecialist] = useState<string|null>(null);
    const [date, setDate] = useState<string|null>(null);
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

    // type specific fields
    const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
    const [employerName, setEmployerName] = useState<string|null>(null);
    const [dischargeDate, setDischargeDate] = useState<string|null>(null);
    const [dischargeCriteria, setDischargeCriteria] = useState<string|null>(null);

    // change handlers
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value as EntryType);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleSpecialistChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpecialist(event.target.value);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const handleDiagnosisCodeChange = (event: SelectChangeEvent<string[]>) => {
        const {target: {value}} = event;
        setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
    };

    const handleEmployerNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmployerName(event.target.value);
    };

    const handleHealthCheckRatingChange = (event: Event, value: number | number[]) => {
        event.preventDefault();
        setHealthCheckRating(value as number);
    };

    const handleDischargeDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDischargeDate(event.target.value);
    };

    const handleDischargeCriteriaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDischargeCriteria(event.target.value);
    };

    const body: object = {
        type: selectedValue,
        description,
        specialist,
        date,
        diagnosisCodes,
        discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria
        },
        employerName,
        healthCheckRating,
    };

    const resetParameters = ():void => {
        setSelectedValue("Hospital");
        setDescription(null);
        setSpecialist(null);
        setDate(null);
        setDiagnosisCodes([]);
        setDischargeCriteria(null);
        setDischargeDate(null);
        setHealthCheckRating(0);
        setEmployerName(null);
    };

    const setNotification = (message:string):void => {
        setErrorMessage(message);
        setTimeout(():void=>{
            setErrorMessage("");
        }, 1000);
    };

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        patientService
            .createEntry({id: patientId, object: body})
            .then((data: Entry) => {
                handleCreateEntryCallback(data);
                resetParameters();
                onClose();
            })
            .catch((error: unknown) => {
                if (axios.isAxiosError(error)) {
                    setNotification(error.message);
                } else if (error instanceof ZodError) {
                    setNotification(`Invalid input : ${error.issues[0].path[0]}`);
                } else {
                    setNotification((error as Error).message);
                }
            });
    };

    const commonEntryProps: CommonEntryFormProps = {
        description,
        specialist,
        date,
        diagnosisCodes,
        handleDescriptionChange,
        handleSpecialistChange,
        handleDateChange,
        handleDiagnosisCodeChange
    };

    const typeSpecificEntryProps: TypeSpecificEntryFormProps = {
        type: selectedValue,
        dischargeDate,
        dischargeCriteria,
        employerName,
        healthCheckRating,
        handleDischargeCriteriaChange,
        handleEmployerNameChange,
        handleDischargeDateChange,
        handleHealthCheckRatingChange,
    };

    return (<Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
        <DialogTitle>Add a new entry</DialogTitle>
        <Box sx={{padding: "0px 30px"}}>
            <Notification errorMessage={errorMessage}/>
        </Box>
        <RadioGroup row value={selectedValue} onChange={handleChange} sx={{display: "flex", justifyContent: "center"}}>
            <FormControlLabel value="Hospital" control={<Radio/>} label="Hospital"/>
            <FormControlLabel value="OccupationalHealthcare" control={<Radio/>} label="Occupational Health Care"/>
            <FormControlLabel value="HealthCheck" control={<Radio/>} label="Health Check"/>
        </RadioGroup>
        <Divider/>
        <DialogContent>
            {error && <Alert severity="error">{error}</Alert>}
            <CommonEntryForm {...commonEntryProps}/>
            <TypeSpecificContent {...typeSpecificEntryProps}/>
            <Button variant="contained" onClick={handleSubmit} sx={{
                position: "absolute",
                bottom: 20,   // 20px from the bottom
                right: 50,     // 20px from the left
            }}>Submit</Button>
        </DialogContent>
    </Dialog>);
};

export default AddEntryModal;
