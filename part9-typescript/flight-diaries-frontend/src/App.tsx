import { useEffect, useState } from "react";

function App() {
  interface Diaries {
    id: string;
    date: string;
    visibility: string;
    weather: string;
    comment: string;
  }
  const [diaries, setDiaries] = useState<Diaries[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/diaries")
      .then((res) => res.json() as Promise<Diaries[]>)
      .then((data) => setDiaries(diaries.concat(data)));
  }, []);

  return (
    <>
      <h2>Add New Entry</h2>
      <form>
        <input type="date" placeholder="Date" /> <br />
        <input type="text" placeholder="Visibility" /> <br />
        <input type="text" placeholder="Weather" /> <br />
        <input type="text" placeholder="Comment" /> <br />
        <button type="submit">Add</button>
      </form>
      <h2>Diary Entries</h2>
      {diaries.map((d, i) => (
        <div key={`${i}-${d.id}`}>
          <h4>{d.date}</h4>
          <p>Visibility: {d.visibility}</p>
          <p>Weather: {d.weather}</p>
          <p>{d.comment}</p>
        </div>
      ))}
    </>
  );
}

export default App;
