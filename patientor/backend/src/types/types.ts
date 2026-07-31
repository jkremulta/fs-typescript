export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: string;
  occupation: string;
}

export type NewPatientEntry = Omit<PatientsEntry, "id">;

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];
