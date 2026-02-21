import type { Note } from "../../types";

const baseUrl = "http://localhost:3000/notes";

export const getAllNote = () => {
  return fetch(baseUrl).then((res) => res.json() as Promise<Note[]>);
};

export const createNote = (noteToAdd: Note) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteToAdd),
  }).then((res) => res.json() as Promise<Note[]>);
};
