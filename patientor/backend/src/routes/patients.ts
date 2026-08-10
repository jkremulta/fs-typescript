import express from "express";
import patientsService from "../services/patientsService.ts";
import type {
  Patient,
  NewPatientEntry,
  EntryWithoutId,
  Entry,
} from "../types.ts";
import {
  errorMiddleware,
  newEntryParser,
  newPatientParser,
} from "../middleware.ts";
import { type Request, type Response } from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  const data = patientsService.getEntries();

  return res.send(data);
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedEntry = patientsService.addPatients(req.body);
    return res.json(addedEntry);
  },
);

router.get("/:id", (req, res) => {
  const { id } = req.params;

  try {
    const data = patientsService.getPatient(id);
    return res.json(data);
  } catch {
    return res.status(404).send("Patient not found");
  }
});

router.post(
  "/:id/entries",
  newEntryParser,
  (
    req: Request<{ id: string }, unknown, EntryWithoutId>,
    res: Response<Entry>,
  ) => {
    const { id } = req.params;
    const entry = req.body;

    const newEntry = patientsService.addEntry(id, entry);

    res.json(newEntry);
  },
);

router.use(errorMiddleware);

export default router;
