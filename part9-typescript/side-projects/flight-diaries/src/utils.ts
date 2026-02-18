import { NewDiaryEntry, Visibility, Weather } from "./types";
import z from "zod";

// even if text is string the returned value is boolean!
// const isString = (text: unknown): text is string => {
//   return typeof text === "string" || text instanceof String;
// };

// const parseComment = (comment: unknown): string => {
//   if (!comment || !isString(comment)) {
//     throw new Error("Incorrect or missing comment");
//   }
//   return comment;
// };

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };

// const parseDate = (date: unknown): string => {
//   if (!isString(date) || !isDate(date)) {
//     throw new Error("Incorrect or missing date: " + date);
//   }
//   return date;
// };

// const isWeather = (param: string): param is Weather => {
//   return Object.values(Weather)
//     .map((v) => v.toString())
//     .includes(param);
// };

// const parseWeather = (weather: unknown): Weather => {
//   if (!isString(weather) || !isWeather(weather)) {
//     throw new Error("Incorrect or missing weather: " + weather);
//   }
//   return weather;
// };

// const isVisibility = (param: string): param is Visibility => {
//   return Object.values(Visibility)
//     .map((v) => v.toString())
//     .includes(param);
// };

// const parseVisibility = (visibility: unknown): Visibility => {
//   if (!isString(visibility) || !isVisibility(visibility)) {
//     throw new Error("Incorrect or missing weather: " + visibility);
//   }
//   return visibility;
// };

export const newEntrySchema = z.object({
  weather: z.enum(Weather),
  visibility: z.enum(Visibility),
  date: z.iso.date(),
  comment: z.string(),
});

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  return newEntrySchema.parse(object);
  // if (!object || typeof object !== "object") {
  //   throw new Error("Incorrect or missing data");
  // }
  // if (
  //   "comment" in object &&
  //   "date" in object &&
  //   "weather" in object &&
  //   "visibility" in object
  // ) {
  //   const newEntry: NewDiaryEntry = {
  //     weather: z.enum(Weather).parse(object.weather),
  //     visibility: z.enum(Visibility).parse(object.visibility),
  //     date: z.string().date().parse(object.date),
  //     comment: z.string().parse(object.comment),
  //   };
  //   return newEntry;
  // }
  // throw new Error("Incorrect data: some fields are missing");
};

export default toNewDiaryEntry;
