import express from "express";
import patientsService from "../services/patientsService.ts";
import { type PatientEntry, type NewPatientEntry } from "../types.ts";
import { errorMiddleware, newPatientParser } from "../middleware.ts";
import { type Request, type Response } from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  const data = patientsService.getEntries();

  return res.send(data);
});

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<PatientEntry>,
  ) => {
    const addedEntry = patientsService.addPatients(req.body);
    return res.json(addedEntry);
  },
);

router.use(errorMiddleware);

export default router;
