import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnosesRouter";
import patientsRouter from "./routes/patientsRouter";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
  res.json("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log("server is running on port:", PORT);
});
