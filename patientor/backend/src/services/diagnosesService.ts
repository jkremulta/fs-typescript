import data from "../diagnoses.ts";
import type { DiagnosesEntry } from "../types.ts";

const diagnoses: DiagnosesEntry[] = data;

const getEntries = (): DiagnosesEntry[] => {
  return diagnoses;
};

export default {
  getEntries,
};
