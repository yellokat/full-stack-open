import {HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry} from "../types/types";

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