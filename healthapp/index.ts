import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";

const app = express();

app.get("/bmi", (req, res) => {
  if (!req.query.height || !req.query.weight) {
    return res.json({ error: "malformatted parameters" });
  }

  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);

  if (Number.isNaN(height) || Number.isNaN(weight))
    return res.json({ error: "malformatted parameters" });

  const bmi = calculateBmi(height, weight);

  const data = {
    weight,
    height,
    bmi,
  };

  return res.json(data);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
