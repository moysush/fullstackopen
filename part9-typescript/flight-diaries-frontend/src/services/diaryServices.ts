import type { Diary, NewDiary, ValidationError } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaries = () => {
  return fetch(baseUrl).then((res) => res.json() as Promise<Diary[]>);
};

export const createNewDiary = (content: NewDiary) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(content),
  }).then(async (res) => {
    const data = await res.json();
    if (!res.ok) {
      if (Array.isArray(data.error)) {
        throw new Error(
          data.error
            .map(
              (e: ValidationError) =>
                `Error: Incorrect ${e.path}: ${e.message}`,
            )
            .join(", "),
        );
      }
      throw new Error(data.error);
    }
    return data as Diary;
  });
};
