import z from "zod";
import { newEntrySchema } from "./utils";

export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Windy = "windy",
  Stormy = "stormy",
}
export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export interface DiaryEntry extends NewDiaryEntry {
  id: number;
  // date: string;
  // weather: Weather;
  // visibility: Visibility;
  // comment: string;
}

// export type NewDiaryEntry = Omit<DiaryEntry, "id">;
export type NewDiaryEntry = z.infer<typeof newEntrySchema>;
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;
