import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

// to receive parameters data as json in req.body instead of undefined
app.use(express.json());

const errorMal = "malformatted parameters";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (_req, res) => {
  const height = Number(_req.query.height);
  const weight = Number(_req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: errorMal });
    return;
  }

  const result = calculateBmi(height, weight);

  res.json({
    height,
    weight,
    bmi: result,
  });
});

app.post("/exercise", (_req, res) => {
  const { daily_exercises, target } = _req.body as {
    daily_exercises: number[];
    target: number;
  };

  // error handlers
  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }
  if (daily_exercises.some((d) => isNaN(d)) || isNaN(target)) {
    res.status(400).json({ error: errorMal });
    return;
  }

  const result = calculateExercises(daily_exercises, target);
  res.json(result);
});

const PORT = 3005;

app.listen(PORT, () => {
  console.log("the server is running on port", PORT);
});
