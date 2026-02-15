import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
  res.json("pong");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log("server is running on port:", PORT);
});
