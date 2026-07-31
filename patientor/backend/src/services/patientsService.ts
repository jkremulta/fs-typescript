import data from "../patients.ts";
import type { PatientsEntry, NewPatientEntry } from "../types/types.ts";

const patients: PatientsEntry[] = data;

const getEntries = (): PatientsEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatients = (patient: NewPatientEntry): PatientsEntry => {
  const newPatients: PatientsEntry = {
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
