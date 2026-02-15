import express from "express";

const app = express();

app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.json("pong");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log("server is running on port: ", PORT);
});
