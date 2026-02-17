import { NewDiaryEntry } from "./types";

const toNewDiaryEntry = (_object: unknown): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    weather: "cloudy", // fake the return value
    visibility: "great",
    date: "2022-1-1",
    comment: "fake news",
  };
  return newEntry;
};

export default toNewDiaryEntry;
