import { useEffect, useRef, useState } from "react";
import type { Diary, NewDiary } from "./types";
import { createNewDiary, getAllDiaries } from "./services/diaryServices";
import { NewDiaryForm } from "./components/NewDiaryForm";
import { useNotification } from "./useNotification";
import { Notification } from "./components/Notification";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [message, notify] = useNotification();
  const resetForm = useRef<() => void>(() => {});

  useEffect(() => {
    getAllDiaries()
      .then((data) => setDiaries(data))
      .catch((error: unknown) =>
        error instanceof Error
          ? notify(error.message)
          : notify("An unexpected error occured"),
      );
  });

  const handleNewDiary = (newEntry: NewDiary) => {
    createNewDiary(newEntry)
      .then((data) => {
        setDiaries((prev) => prev.concat(data));
        resetForm.current();
        notify("New entry added!");
      })
      .catch((error: unknown) =>
        error instanceof Error
          ? notify(error.message)
          : notify("An unexpected error occured"),
      );
  };

  return (
    <>
      <div>
        <h2>Add New Entry</h2>
        <Notification message={message} />
        <NewDiaryForm onSubmit={handleNewDiary} formRef={resetForm} />
      </div>
      <div>
        <h2>Diary Entries</h2>
        {diaries.map((d, i) => (
          <div key={`${i}-${d.id}`}>
            <h4>{d.date}</h4>
            <p>Visibility: {d.visibility}</p>
            <p>Weather: {d.weather}</p>
            <p>{d.comment}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
