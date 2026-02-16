import express from "express";
import diaryService from "../services/diaryService";

const router = express.Router();

router.get("/", (_req, res) => {
  const result = diaryService.getNonSensitiveEntries();
  res.send(result);
});

router.post("/", (_req, res) => {
  res.send("saving a diary");
});

export default router;
