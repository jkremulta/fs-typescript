import data from "../patients.ts";
import type {
  NewPatientEntry,
  NonSensitivePatientEntry,
  EntryWithoutId,
  Entry,
  Patient,
} from "../types.ts";

const patients: Patient[] = data;

const getEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatients = (patient: NewPatientEntry): Patient => {
  const newPatients: Patient = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    ...patient,
    entries: [],
  };

  patients.push(newPatients);
  return newPatients;
};

const getPatient = (id: string): Patient => {
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    throw new Error("Patient not found");
  }

  return patient;
};

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    throw new Error("Patient not found");
  }

  const newEntry: Entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    ...entry,
  };

  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getEntries,
  addPatients,
  getPatient,
  addEntry,
};
