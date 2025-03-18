import axios from "axios";
import {
    Entry,
    NewEntry,
    NewHealthCheckEntry,
    NewHospitalEntry,
    NewOccupationalHealthcareEntry,
    Patient,
    PatientFormValues
} from "../types/types.ts";

import {apiBaseUrl} from "../constants";
import {
    validateNewHealthCheckEntry,
    validateNewHospitalEntry,
    validateNewOccupationalHealthcareEntry,
} from "../utils/validators.ts";
import {NewEntrySchema} from "../types/schemas.ts";
import {util} from "zod";
import assertNever = util.assertNever;

const getAll = async (): Promise<Patient[]> => {
    const {data}: { data: Patient[] } = await axios.get<Patient[]>(
        `${apiBaseUrl}/patients`
    );
    return data;
};

const findById = async (id: string): Promise<Patient> => {
    const {data}: { data: Patient } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
    );
    return data;
};

const create = async (object: PatientFormValues): Promise<Patient> => {
    const {data}: { data: Patient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        object
    );
    return data;
};

const createEntry = async ({id, object}: { id: string, object: unknown }): Promise<Entry> => {
    // error if parameters are missing
    let body: NewEntry = NewEntrySchema.parse(object);

    // remove excess parameters
    switch (body.type) {
        case "Hospital":
            body = validateNewHospitalEntry(body as NewHospitalEntry);
            break;
        case "OccupationalHealthcare":
            body = validateNewOccupationalHealthcareEntry(body as NewOccupationalHealthcareEntry);
            break;
        case "HealthCheck":
            body = validateNewHealthCheckEntry(body as NewHealthCheckEntry);
            break;
        default:
            return assertNever(body);
    }

    // make request
    const {data}: { data: Entry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        body
    );
    return data;
};

export default {
    getAll, findById, create, createEntry,
};
