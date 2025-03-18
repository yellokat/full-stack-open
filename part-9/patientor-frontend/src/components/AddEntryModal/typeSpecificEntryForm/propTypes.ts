import React from "react";
import {EntryType} from "../../../types/types.ts";

export interface TypeSpecificEntryFormProps {
    type: EntryType;
    dischargeDate: string | null;
    dischargeCriteria: string | null;
    employerName: string | null;
    healthCheckRating: number;
    handleDischargeDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDischargeCriteriaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleEmployerNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleHealthCheckRatingChange: (event: Event, value: number | number[]) => void;
}

export interface HospitalEntryProps {
    dischargeDate: string | null;
    dischargeCriteria: string | null;
    handleDischargeDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDischargeCriteriaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface HealthCheckEntryProps {
    healthCheckRating: number;
    handleHealthCheckRatingChange: (event: Event, value: number | number[]) => void;
}