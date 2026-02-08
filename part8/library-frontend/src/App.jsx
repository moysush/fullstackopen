import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import { useApolloClient, useSubscription } from "@apollo/client/react";
import Recommend from "./Recommend";
import { BOOK_ADDED } from "./queries";
const App = () => {
  const [page, setPage] = useState("authors");
  const [message, setMessage] = useState(null);
  const [userLogged, setUserLogged] = useState(
    localStorage.getItem("library-user"),
  );

  const client = useApolloClient();
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      setNotify(`New book: ${data.data.bookAdded.title} added.`);
    },
  });

  const setNotify = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const onLogout = () => {
    setNotify(`${userLogged} logged out`);
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
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={onLogout}>logout</button>
            <div>
              <p>
                <b>{userLogged}</b> is logged in
              </p>
            </div>
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
        setPage={setPage}
        setUserLogged={setUserLogged}
      />
      <Recommend show={page === "recommend"} setNotify={setNotify} />
    </div>
  );
};

export default App;
