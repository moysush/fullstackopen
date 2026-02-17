import diaryData from "../../data/diaryentries";
import { DiaryEntry, NonSensitiveDiaryEntry } from "../types";

const getEntries = () => {
  return diaryData;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaryData.map(({ id, date, visibility, weather }) => {
    return { id, date, visibility, weather };
  });
};

const findById = (id: number): DiaryEntry | undefined => {
  return diaryData.find(d => d.id === id);
};

const addDiary = () => {
  return null;
};


export default { getEntries, addDiary, getNonSensitiveEntries, findById };
