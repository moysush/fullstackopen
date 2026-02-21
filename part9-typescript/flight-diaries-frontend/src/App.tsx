import { useEffect, useState } from "react";

function App() {
  interface Diaries {
    id: string;
    date: string;
    visibility: string;
    weather: string;
    comment: string;
  }
  const baseUrl = "http://localhost:3000/api/diaries";
  const [diaries, setDiaries] = useState<Diaries[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(baseUrl)
      .then((res) => res.json() as Promise<Diaries[]>)
      .then((data) => setDiaries(diaries.concat(data)))
      .catch((e) => console.log(e));
  }, []);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newEntry = {
      date,
      visibility,
      weather,
      comment,
    };

    fetch(baseUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newEntry),
    })
      .then((res) => res.json())
      .then((data: Diaries) => setDiaries((prev) => prev.concat(data)));

    // reset states
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <>
      <h2>Add New Entry</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />{" "}
        <br />
        <input
          type="text"
          placeholder="Visibility"
          value={visibility}
          onChange={({ target }) => setVisibility(target.value)}
        />{" "}
        <br />
        <input
          type="text"
          placeholder="Weather"
          value={weather}
          onChange={({ target }) => setWeather(target.value)}
        />{" "}
        <br />
        <input
          type="text"
          placeholder="Comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />{" "}
        <br />
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
