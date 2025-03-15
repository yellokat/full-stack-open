import {v1 as uuid} from 'uuid';
import {NewPatient, Patient, PublicPatient} from "../types";
import patientDatabase from "../data/patients";

const getPatients = (): Patient[] => {
    return patientDatabase;
};

const getPublicPatients = (): PublicPatient[] => {
    return patientDatabase.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (entry: NewPatient):Patient=>{
    const id:string = uuid();
    const newPatient = {
        id,
        ...entry
    };
    patientDatabase.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    getPublicPatients,
    addPatient,
};