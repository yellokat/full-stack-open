export type Gender = 'male' | 'female' | "other";

export interface DiagnosisEntry {
    code: string;
    name: string;
    latin?: string;
}

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type PublicPatientEntry = Omit<PatientEntry, 'ssn'>;