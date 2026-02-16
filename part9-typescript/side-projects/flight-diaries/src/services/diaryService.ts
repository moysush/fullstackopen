import diaryData from "../../data/diaryentries";
import { NonSensitiveDiaryEntry } from "../types";

const getEntries = () => {
  return diaryData;
};

const addDiary = () => {
  return null;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaryData.map(({ id, date, visibility, weather }) => {
    return { id, date, visibility, weather };
  });
};

export default { getEntries, addDiary, getNonSensitiveEntries };
