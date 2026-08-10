import data from "../diagnoses.ts";
import type { Diagnosis } from "../types.ts";

const diagnoses: Diagnosis[] = data;

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getEntries,
};
