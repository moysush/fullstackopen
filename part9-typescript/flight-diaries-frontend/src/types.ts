import type { RefObject } from "react";

export interface Diary {
  id: string;
  date: string;
  visibility: string;
  weather: string;
  comment: string;
}

export type NewDiary = Omit<Diary, "id">;

export interface NewDiaryFormProps {
  onSubmit: (newDiary: NewDiary) => void;
  formRef: RefObject<() => void>;
}

export interface ValidationError {
  path: string[];
  message: string;
}
