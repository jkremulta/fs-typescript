import data from "../patients.ts";
import type {
  PatientEntry,
  NewPatientEntry,
  NonSensitivePatientEntry,
} from "../types.ts";

const patients: PatientEntry[] = data;

const getEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatients = (patient: NewPatientEntry): PatientEntry => {
  const newPatients: PatientEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    ...patient,
  };

  patients.push(newPatients);
  return newPatients;
};

export default {
  getEntries,
  addPatients,
};
