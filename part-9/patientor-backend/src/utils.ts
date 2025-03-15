import {Gender, NewPatient} from "./types";

const toNewPatient = (object:unknown):NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newEntry: NewPatient = {
            name: validateStringField(object.name),
            dateOfBirth: validateDate(object.dateOfBirth),
            ssn: validateStringField(object.ssn),
            gender: validateGender(object.gender),
            occupation: validateStringField(object.occupation)
        };

        return newEntry;
    }

    throw new Error('Incorrect data: some fields are missing');
};

// ========================================================================
// comment field validators
// ========================================================================

const validateStringField = (param: unknown): string => {
    if (!param || !isString(param)) {
        throw new Error('Incorrect or missing comment');
    }
    return param;
};

// ========================================================================
// date field validators
// ========================================================================

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const validateDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

// ========================================================================
// gender field validators
// ========================================================================

const validateGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing weather: ' + gender);
    }
    return gender;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};


// ========================================================================
// helper functions
// ========================================================================

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export default toNewPatient;