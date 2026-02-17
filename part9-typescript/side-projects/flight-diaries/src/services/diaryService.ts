import diaryData from "../../data/diaryentries";
import {
  DiaryEntry,
  NewDiaryEntry,
  NonSensitiveDiaryEntry,
} from "../types";

const getEntries = () => {
  return diaryData;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaryData.map(({ id, date, visibility, weather }) => {
    return { id, date, visibility, weather };
  });
};

const findById = (id: number): DiaryEntry | undefined => {
  return diaryData.find((d) => d.id === id);
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaryData.map((d) => d.id)) + 1,
    ...entry,
  };

  diaryData.push(newDiaryEntry);
  return newDiaryEntry;
};

export default { getEntries, addDiary, getNonSensitiveEntries, findById };
