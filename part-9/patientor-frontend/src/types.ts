export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

interface DiagnosisBase {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends DiagnosisBase {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface DischargeEntry {
  date: string;
  criteria: string;
}

interface HospitalEntry extends DiagnosisBase {
  discharge: DischargeEntry;
}

interface OccupationalHealthcareEntry extends DiagnosisBase {
  employername: string;
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export type PatientFormValues = Omit<Patient, "id" | "entries">;