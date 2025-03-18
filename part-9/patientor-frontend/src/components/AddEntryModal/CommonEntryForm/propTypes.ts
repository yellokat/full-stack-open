import React from "react";
import {SelectChangeEvent} from "@mui/material";

export interface CommonEntryFormProps {
    description: string | null,
    specialist: string | null,
    date: string | null,
    diagnosisCodes: string[],
    handleDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleSpecialistChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleDiagnosisCodeChange: (event: SelectChangeEvent<string[]>) => void,
}