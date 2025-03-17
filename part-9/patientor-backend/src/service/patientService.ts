import {v1 as uuid} from 'uuid';
import {
    Entry, HealthCheckEntry,
    HospitalEntry,
    NewEntry,
    NewPatient,
    OccupationalHealthcareEntry,
    Patient,
    PublicPatient
} from "../types/types";
import patientDatabase from "../data/patients";
import NotExistResourceError from "../utils/errors";
import {util} from "zod";
import assertNever = util.assertNever;
import {
    validateHealthCheckEntry,
    validateHospitalEntry,
    validateOccupationalHealthcareEntry
} from "../utils/validators";

const getPatients = (): Patient[] => {
    return patientDatabase;
};

const findByIdOrError = (id:string) : Patient => {
    const foundPatient:Patient|undefined = patientDatabase.find((patient) => patient.id === id);
    if (!foundPatient) {
        throw new NotExistResourceError();
    }
    return foundPatient;
};

const addPatient = (entry: NewPatient): Patient => {
    // input validation is done in middleware
    const id: string = uuid();
    const newPatient = {
        id,
        ...entry,
        entries: []
    };
    patientDatabase.push(newPatient);
    return newPatient;
};

const addEntry = (id: string, entry: NewEntry): Entry=> {
    // input validation is done in middleware
    const entryId: string = uuid();

    // parse entry
    let newEntry:Entry;
    switch(entry.type){
        // ================================================
        case "Hospital":
            newEntry =  {
                id:entryId,
                ...entry
            } as HospitalEntry;
            newEntry = validateHospitalEntry(newEntry);
            break;
        // ================================================
        case "OccupationalHealthcare":
            newEntry =  {
                id:entryId,
                ...entry
            } as OccupationalHealthcareEntry;
            newEntry = validateOccupationalHealthcareEntry(newEntry);
            break;
        // ================================================
        case "HealthCheck":
            newEntry =  {
                id:entryId,
                ...entry
            } as HealthCheckEntry;
            newEntry = validateHealthCheckEntry(newEntry);
            break;
        // ================================================
        default:
            return assertNever(entry.type);
    }

    // append entry to target patient
    const patient:Patient = findByIdOrError(id);
    patient.entries.push(newEntry);
    return newEntry;
};

// patient type without ssn.
// returns new object, does not mutate input
const toPublicPatient = (patient: Patient): PublicPatient => {
    const {
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    } = patient;
    return ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    });
};

export default {
    getPatients,
    findByIdOrError,
    addPatient,
    addEntry,
    toPublicPatient,
};