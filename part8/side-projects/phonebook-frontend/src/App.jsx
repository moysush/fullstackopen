import {
  useQuery,
  useApolloClient,
  useSubscription,
} from "@apollo/client/react";
import Persons from "./Components/Persons";
import PersonForm from "./Components/PersonForm";
import { ALL_PERSONS, PERSON_ADDED } from "./queries";
import Notify from "./Components/Notify";
import { useState } from "react";
import PhoneForm from "./Components/PhoneForm";
import LoginForm from "./Components/LoginForm";
import { addPersonToCache } from "../utils/apolloCache";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("phonebook-user-token"),
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const [messageColor, setMessageColor] = useState("red");
  const { data, loading } = useQuery(ALL_PERSONS);
  const client = useApolloClient();

  const [currentUserName, setCurrentUserName] = useState(
    localStorage.getItem("username"),
  );

  useSubscription(PERSON_ADDED, {
    onData: ({ data }) => {
      const addedPerson = data.data.personAdded;
      notify(`${addedPerson.name} added`, "green");
      addPersonToCache(client.cache, addedPerson);
    },
  });

  if (loading) return "loading...";

  const onLogout = () => {
    setToken(null);
    setCurrentUserName("");
    localStorage.clear();
    client.resetStore(); // resets the apollog client cache
  };

  const notify = (message, color) => {
    setErrorMessage(message);
    setMessageColor(color);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
          setCurrentUserName={setCurrentUserName}
        />
      </div>
    );
  }

  return (
    <>
      <div>
        <span>{currentUserName} </span>
        <button onClick={onLogout}>logout</button>
      </div>
      <Notify errorMessage={errorMessage} messageColor={messageColor} />
      <Persons persons={data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  );
}

export default App;
