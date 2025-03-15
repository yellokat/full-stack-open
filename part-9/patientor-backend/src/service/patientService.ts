import {PatientEntry, PublicPatientEntry} from "../types";
import patientEntries from "../data/patients";

export const getPatientEntries = (): PatientEntry[] => {
    return patientEntries.map(({id, name, dateOfBirth, ssn, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    }));
};

export const getPublicPatientEntries = (): PublicPatientEntry[] => {
    return patientEntries.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};