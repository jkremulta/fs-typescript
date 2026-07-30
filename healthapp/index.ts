import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { type Result, calculateExercises } from "./exerciseCalculator.ts";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  return res.send("Hello Full Stack!");
});

// bmi calculator
app.get("/bmi", (req, res) => {
  if (!req.query.height || !req.query.weight) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);

  if (Number.isNaN(height) || Number.isNaN(weight))
    return res.status(400).json({ error: "malformatted parameters" });

  const bmi = calculateBmi(height, weight);

  const data = {
    weight,
    height,
    bmi,
  };

  return res.json(data);
});

// exercise calculator
app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((value) => typeof value === "number")
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  if (Number.isNaN(Number(target))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const stats: Result = calculateExercises(daily_exercises, target);

  return res.json(stats);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
