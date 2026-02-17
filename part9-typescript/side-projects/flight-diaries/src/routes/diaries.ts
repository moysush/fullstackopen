/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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

router.post("/", (req, res) => {
  const { date, weather, visibility, comment } = req.body;

  const addedEntry = diaryService.addDiary({date, weather, visibility, comment});
  res.json(addedEntry);
});

export default router;
