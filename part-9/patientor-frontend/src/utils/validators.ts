// noinspection DuplicatedCode

import {
    HospitalEntry,
    OccupationalHealthcareEntry,
    HealthCheckEntry,
    NewHospitalEntry,
    NewOccupationalHealthcareEntry,
    NewHealthCheckEntry,
} from "../types/types.ts";

export const validateNewHospitalEntry = (entry:NewHospitalEntry):NewHospitalEntry => {
    return {
        type: entry.type,
        description: entry.description,
        date: entry.date,
        specialist: entry.specialist,
        diagnosisCodes: entry.diagnosisCodes,
        discharge: entry.discharge
    };
};
export const validateNewOccupationalHealthcareEntry = (entry:NewOccupationalHealthcareEntry):NewOccupationalHealthcareEntry => {
    return {
        type: entry.type,
        description: entry.description,
        date: entry.date,
        specialist: entry.specialist,
        diagnosisCodes: entry.diagnosisCodes,
        employerName: entry.employerName,
    };
};
export const validateNewHealthCheckEntry = (entry:NewHealthCheckEntry):NewHealthCheckEntry => {
    return {
        type: entry.type,
        description: entry.description,
        date: entry.date,
        specialist: entry.specialist,
        diagnosisCodes: entry.diagnosisCodes,
        healthCheckRating: entry.healthCheckRating,
    };
};

export const validateHospitalEntry = (entry:HospitalEntry):HospitalEntry => {
    return {
        type: entry.type,
        id: entry.id,
        description: entry.description,
        date: entry.date,
        specialist: entry.specialist,
        diagnosisCodes: entry.diagnosisCodes,
        discharge: entry.discharge
    };
};
export const validateOccupationalHealthcareEntry = (entry:OccupationalHealthcareEntry):OccupationalHealthcareEntry => {
    return {
        type: entry.type,
        id: entry.id,
        description: entry.description,
        date: entry.date,
        specialist: entry.specialist,
        diagnosisCodes: entry.diagnosisCodes,
        employerName: entry.employerName,
    };
};
export const validateHealthCheckEntry = (entry:HealthCheckEntry):HealthCheckEntry => {
    return {
        type: entry.type,
        id: entry.id,
        description: entry.description,
        date: entry.date,
        specialist: entry.specialist,
        diagnosisCodes: entry.diagnosisCodes,
        healthCheckRating: entry.healthCheckRating,
    };
};