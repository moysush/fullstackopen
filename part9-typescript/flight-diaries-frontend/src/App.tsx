import { useEffect, useState } from "react";
import type { Diary, NewDiary } from "./types";
import { createNewDiary, getAllDiaries } from "./services/diaryServices";
import { NewDiaryForm } from "./NewDiaryForm";
import { useNotification } from "./useNotification";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [message, notify] = useNotification();

  useEffect(() => {
    getAllDiaries()
      .then((data) => setDiaries(data))
      .catch((error: unknown) =>
        error instanceof Error
          ? notify(error.message)
          : notify("An unexpected error occured"),
      );
  }, []);

  const handleNewDiary = (newEntry: NewDiary) => {
    createNewDiary(newEntry)
      .then((data) => {
        setDiaries((prev) => prev.concat(data));
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
        <p
          style={
            message.includes("Error") ? { color: "red" } : { color: "green" }
          }
        >
          {message}
        </p>
        <NewDiaryForm onSubmit={handleNewDiary} />
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
