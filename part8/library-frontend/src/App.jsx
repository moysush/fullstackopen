import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";

const App = () => {
  const [page, setPage] = useState("authors");
  const [message, setMessage] = useState(null);

  const setNotify = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Notify message={message} />

      <Authors show={page === "authors"} setNotify={setNotify} />
      <Books show={page === "books"} setNotify={setNotify} />
      <NewBook show={page === "add"} setNotify={setNotify} />
    </div>
  );
};

export default App;
