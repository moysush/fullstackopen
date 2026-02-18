import express, { Request, Response } from "express";
import diaryService from "../services/diaryService";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";
import { newEntrySchema } from "../utils";
import z from "zod";

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

router.post(
  "/",
  (
    req: Request<unknown, unknown, NewDiaryEntry>,
    res: Response<DiaryEntry | { error: unknown }>,
  ) => {
    try {
      // validate in toNewDiaryEntry
      const newDiaryEntry = newEntrySchema.parse(req.body);

      const addedEntry = diaryService.addDiary(newDiaryEntry);
      res.json(addedEntry);
    } catch (error) {
      // let errorMessage = "Something went wrong. ";
      if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
        // errorMessage += "Error: " + error.message;
      } else {
        res.status(400).send({ error: "unknown error" });
      }
      // res.status(400).send(errorMessage);
    }
  },
);

export default router;
