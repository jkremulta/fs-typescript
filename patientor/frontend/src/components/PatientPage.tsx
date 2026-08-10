import { useParams } from "react-router-dom";
import type { Diagnosis, Patient, EntryWithoutId, Entry, HealthCheckRating } from "../types";
import { useEffect, useState } from "react";
import patientService from "../services/patients";
import diagnosesService from "../services/diagnoses";
import EntryDetails from "../components/EntryDetails";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const initialFormState = {
  type: "HealthCheck" as EntryWithoutId["type"],
  date: "",
  description: "",
  specialist: "",
  diagnosisCodes: [] as string[],
  // HealthCheck
  healthCheckRating: "",
  // OccupationalHealthcare
  employerName: "",
  sickLeaveStartDate: "",
  sickLeaveEndDate: "",
  // Hospital
  dischargeDate: "",
  dischargeCriteria: "",
};

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState(initialFormState);
  const [formOpen, setFormOpen] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      patientService.getPatient(id).then((data) => setPatient(data));
    }
  }, [id]);

  useEffect(() => {
    diagnosesService.getDiagnoses().then((data) => {
      setDiagnoses(data);
    });
  }, []);

  if (!patient) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) return;

    let entry: EntryWithoutId;

    if (formData.type === "HealthCheck") {
      entry = {
        type: "HealthCheck",
        date: formData.date,
        description: formData.description,
        specialist: formData.specialist,
        diagnosisCodes: formData.diagnosisCodes,
        healthCheckRating: Number(formData.healthCheckRating) as HealthCheckRating,
      };
    } else if (formData.type === "OccupationalHealthcare") {
      entry = {
        type: "OccupationalHealthcare",
        date: formData.date,
        description: formData.description,
        specialist: formData.specialist,
        diagnosisCodes: formData.diagnosisCodes,
        employerName: formData.employerName,
        sickLeave: {
          startDate: formData.sickLeaveStartDate,
          endDate: formData.sickLeaveEndDate,
        },
      };
    } else {
      entry = {
        type: "Hospital",
        date: formData.date,
        description: formData.description,
        specialist: formData.specialist,
        diagnosisCodes: formData.diagnosisCodes,
        discharge: {
          date: formData.dischargeDate,
          criteria: formData.dischargeCriteria,
        },
      };
    }

    try {
      const response = await patientService.addEntry(id, entry);

      setPatient({
        ...patient,
        entries: patient.entries.concat(response),
      });

      setFormData(initialFormState);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Invalid input.");
    }
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setError(null);
  };

  return (
    <div>
      <div>
        <h2>
          {patient.name}{" "}
          {patient.gender === "male" && <span>♂</span>}
          {patient.gender === "female" && <span>♀</span>}
          {patient.gender === "other" && <span>⚧</span>}
        </h2>
      </div>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <div>date of birth: {patient.dateOfBirth}</div>

      {!formOpen && (
        <Button
          variant="contained"
          onClick={() => setFormOpen(true)}
        >
          Add New Entry
        </Button>
      )}

      {formOpen && (
        <form onSubmit={handleSubmit}>
          <h2>New HealthCheck Entry</h2>

          {error && <div style={{ color: "red" }}>{error}</div>}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

            <FormControl fullWidth size="small">
              <InputLabel id="entry-type-label">Entry Type</InputLabel>
              <Select
                labelId="entry-type-label"
                value={formData.type}
                label="Entry Type"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as Entry["type"],
                  })
                }
              >
                <MenuItem value="HealthCheck">Health Check</MenuItem>
                <MenuItem value="OccupationalHealthcare">
                  Occupational Healthcare
                </MenuItem>
                <MenuItem value="Hospital">Hospital</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="date"
              label="Date"
              size="small"
              type="date"
              value={formData.date}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />

            <TextField
              id="description"
              label="Description"
              size="small"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <TextField
              id="specialist"
              label="Specialist"
              size="small"
              value={formData.specialist}
              onChange={(e) =>
                setFormData({ ...formData, specialist: e.target.value })
              }
            />

            <FormControl fullWidth size="small">
              <InputLabel id="diagnosis-code-label">
                Diagnosis Code
              </InputLabel>

              <Select
                labelId="diagnosis-code-label"
                multiple
                value={formData.diagnosisCodes}
                label="Diagnosis Code"
                renderValue={(selected) => selected.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    diagnosisCodes: e.target.value as string[],
                  })
                }
              >
                {diagnoses.map((d) => (
                  <MenuItem key={d.code} value={d.code}>
                    {d.code} - {d.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {formData.type === "HealthCheck" && (
              <FormControl fullWidth size="small">
                <InputLabel id="health-check-rating">
                  Health Check Rating
                </InputLabel>

                <Select
                  labelId="health-check-rating"
                  value={formData.healthCheckRating}
                  label="Health Check Rating"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      healthCheckRating: e.target.value,
                    })
                  }
                >
                  <MenuItem value="0">0 - Healthy</MenuItem>
                  <MenuItem value="1">1 - Low Risk</MenuItem>
                  <MenuItem value="2">2 - High Risk</MenuItem>
                  <MenuItem value="3">3 - Critical Risk</MenuItem>
                </Select>
              </FormControl>
            )}

            {formData.type === "OccupationalHealthcare" && (
              <>
                <TextField
                  id="employer-name"
                  label="Employer"
                  size="small"
                  value={formData.employerName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      employerName: e.target.value,
                    })
                  }
                />

                <TextField
                  id="sick-leave-start"
                  label="Sick Leave Start"
                  size="small"
                  type="date"
                  value={formData.sickLeaveStartDate}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sickLeaveStartDate: e.target.value,
                    })
                  }
                />

                <TextField
                  id="sick-leave-end"
                  label="Sick Leave End"
                  size="small"
                  type="date"
                  value={formData.sickLeaveEndDate}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sickLeaveEndDate: e.target.value,
                    })
                  }
                />
              </>
            )}

            {formData.type === "Hospital" && (
              <>
                <TextField
                  id="discharge-date"
                  label="Discharge Date"
                  size="small"
                  type="date"
                  value={formData.dischargeDate}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dischargeDate: e.target.value,
                    })
                  }
                />

                <TextField
                  id="discharge-criteria"
                  label="Discharge Criteria"
                  size="small"
                  value={formData.dischargeCriteria}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dischargeCriteria: e.target.value,
                    })
                  }
                />
              </>
            )}

            <div style={{ display: "flex", gap: "8px" }}>
              <Button variant="contained" type="submit">
                Add
              </Button>

              <Button
                variant="outlined"
                type="button"
                onClick={() => {
                  handleCancel();
                  setFormOpen(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Box>
        </form>
      )}

      <h3>entries</h3>
      {patient.entries.map((p) => (
        <div key={p.id}>
          <EntryDetails entry={p} />

          <ul>
            {p.diagnosisCodes?.map((code) => {
              const diagnosis = diagnoses.find((d) => d.code === code);

              return (
                <li key={code}>
                  {diagnosis?.code} {diagnosis?.name}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientPage;