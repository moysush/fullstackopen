import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client/react";
const App = () => {
  const [page, setPage] = useState("authors");
  const [message, setMessage] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token"),
  );
  const [userLogged, setUserLogged] = useState(
    localStorage.getItem("library-user"),
  );
  const client = useApolloClient();

  const setNotify = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const onLogout = () => {
    setUserLogged("");
    localStorage.clear();
    client.resetStore();
    setPage("login");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {userLogged && (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={onLogout}>logout</button>
          </>
        )}
        {!userLogged && <button onClick={() => setPage("login")}>login</button>}
      </div>

      <Notify message={message} />

      <Authors show={page === "authors"} setNotify={setNotify} />
      <Books show={page === "books"} setNotify={setNotify} />
      <NewBook show={page === "add"} setNotify={setNotify} />
      <LoginForm
        show={page === "login"}
        setNotify={setNotify}
        setToken={setToken}
        setPage={setPage}
        setUserLogged={setUserLogged}
      />
    </div>
  );
};

export default App;
