import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (_req, res) => {
  const height = Number(_req.query.height);
  const weight = Number(_req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.json({ error: "malformatted parameters" });
    return;
  }

  const result = calculateBmi(height, weight);

  res.json({
    height,
    weight,
    bmi: result,
  });
});

const PORT = 3005;

app.listen(PORT, () => {
  console.log("the server is running on port", PORT);
});
