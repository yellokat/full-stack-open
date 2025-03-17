// ===========================================================================
// Enums
// ===========================================================================

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export enum DiagnosisCodes {
    L20 = 'L20',
    S62_5 = 'S62.5',
    Z74_3 = 'Z74.3',
    M24_2 = 'M24.2',
    Z57_1 = 'Z57.1',
    J10_1 = 'J10.1',
    S03_5 = 'S03.5',
    M51_2 = 'M51.2',
    H54_7 = 'H54.7',
    J03_0 = 'J03.0',
    H35_29 = 'H35.29',
    J06_9 = 'J06.9',
    N30_0 = 'N30.0',
    L60_1 = 'L60.1',
    F43_2 = 'F43.2',
}

// ===========================================================================
// Patient
// ===========================================================================

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

// ===========================================================================
// Diagnosis Base
// ===========================================================================

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

interface DiagnosisBase {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

// ===========================================================================
// Diagnosis variant - Health Check
// ===========================================================================

export interface HealthCheckEntry extends DiagnosisBase {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface DischargeEntry {
    date: string;
    criteria: string;
}

// ===========================================================================
// Diagnosis variant - Hospital
// ===========================================================================

export interface HospitalEntry extends DiagnosisBase {
    type: "Hospital";
    discharge: DischargeEntry;
}

// ===========================================================================
// Diagnosis variant - Occupational Health Check
// ===========================================================================

export interface OccupationalHealthcareEntry extends DiagnosisBase {
    type: "OccupationalHealthcare";
    employerName: string;
}

// ===========================================================================
// Diagnosis Schema Union
// ===========================================================================

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

// export type NewEntry =
//     | Omit<HospitalEntry, 'id'>
//     | Omit<OccupationalHealthcareEntry, 'id'>
//     | Omit<HealthCheckEntry, 'id'>;

// ===========================================================================
// Utility Types
// ===========================================================================

export type PublicPatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

export type NewEntry = Omit<Entry, 'id'>;