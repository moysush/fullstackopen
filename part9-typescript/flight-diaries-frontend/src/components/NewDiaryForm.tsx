import React, { useEffect, useState } from "react";
import type { NewDiaryFormProps } from "../types";

export const NewDiaryForm = ({ onSubmit, formRef }: NewDiaryFormProps) => {
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  // reset states
  const resetFields = () => {
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  useEffect(() => {
    if (formRef) {
      formRef.current = resetFields;
    }
  }, [formRef]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newEntry = {
      date,
      visibility,
      weather,
      comment,
    };
    onSubmit(newEntry);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        placeholder="Date"
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
      <div>
        Visibility:
        <input
          type="radio"
          id="great"
          name="visibility"
          value="great"
          checked={visibility === "great"}
          onChange={({ target }) => setVisibility(target.value)}
        />
        <label htmlFor="great">great</label>
        <input
          type="radio"
          id="good"
          name="visibility"
          value="good"
          checked={visibility === "good"}
          onChange={({ target }) => setVisibility(target.value)}
        />
        <label htmlFor="good">good</label>
        <input
          type="radio"
          id="ok"
          name="visibility"
          value="ok"
          checked={visibility === "ok"}
          onChange={({ target }) => setVisibility(target.value)}
        />
        <label htmlFor="ok">ok</label>
        <input
          type="radio"
          id="poor"
          name="visibility"
          value="poor"
          checked={visibility === "poor"}
          onChange={({ target }) => setVisibility(target.value)}
        />
        <label htmlFor="poor">poor</label>
      </div>
      <div>
        Weather:
        <input
          type="radio"
          id="sunny"
          name="weather"
          value="sunny"
          checked={weather === "sunny"}
          onChange={({ target }) => setWeather(target.value)}
        />
        <label htmlFor="sunny">sunny</label>
        <input
          type="radio"
          id="rainy"
          name="weather"
          value="rainy"
          checked={weather === "rainy"}
          onChange={({ target }) => setWeather(target.value)}
        />
        <label htmlFor="rainy">rainy</label>
        <input
          type="radio"
          id="cloudy"
          name="weather"
          value="cloudy"
          checked={weather === "cloudy"}
          onChange={({ target }) => setWeather(target.value)}
        />
        <label htmlFor="cloudy">cloudy</label>
        <input
          type="radio"
          id="stormy"
          name="weather"
          value="stormy"
          checked={weather === "stormy"}
          onChange={({ target }) => setWeather(target.value)}
        />
        <label htmlFor="stormy">stormy</label>
        <input
          type="radio"
          id="windy"
          name="weather"
          value="windy"
          checked={weather === "windy"}
          onChange={({ target }) => setWeather(target.value)}
        />
        <label htmlFor="windy">windy</label>
      </div>
      <input
        type="text"
        placeholder="Comment"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <br />
      <button type="submit">Add</button>
    </form>
  );
};
