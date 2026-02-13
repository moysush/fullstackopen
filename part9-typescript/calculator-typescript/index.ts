import express from "express";

const app = express();

app.use("/hello", (_req, res) => {
  res.send("Hello Full Stack!"); // when to use comma after hello and when not?
});

const PORT = 3005;

app.listen(PORT, () => {
  console.log("the server is running on port", PORT);
});
