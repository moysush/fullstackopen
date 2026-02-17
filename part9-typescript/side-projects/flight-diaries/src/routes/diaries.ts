import express, { Response } from "express";
import diaryService from "../services/diaryService";
import { NonSensitiveDiaryEntry } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (_req, res) => {
  res.send("saving a diary");
});

export default router;
