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
      .then((data) => setDiaries(data));
    // .catch((e) => console.log(e));
  }, []);

  const handleError = (error: string) => {
    setMessage(error);
    setTimeout(() => {
      setMessage("");
    }, 10000);
  };

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
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          if (Array.isArray(data.error)) {
            throw new Error(
              data.error
                .map((e: any) => `Incorrect ${e.path}: ${e.message}`)
                .join(", "),
            );
          }
          throw new Error(data.error);
        }
        return data;
      })
      .then((data: Diaries) => {
        setDiaries((prev) => prev.concat(data));
        // reset states
        setDate("");
        setVisibility("");
        setWeather("");
        setComment("");
      })
      .catch((error: unknown) =>
        error instanceof Error
          ? handleError(error.message)
          : handleError("An unexpected error occured"),
      );
  };

  return (
    <>
      <h2>Add New Entry</h2>
      <p style={{ color: "red" }}>{message}</p>
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
