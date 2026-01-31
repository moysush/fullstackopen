import { useQuery, useApolloClient } from "@apollo/client/react";
import Persons from "./Components/Persons";
import PersonForm from "./Components/PersonForm";
import { ALL_PERSONS } from "./queries";
import Notify from "./Components/Notify";
import { useState } from "react";
import PhoneForm from "./Components/PhoneForm";
import LoginForm from "./Components/LoginForm";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("phonebook-user-token"),
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const { data, loading } = useQuery(ALL_PERSONS);
  const client = useApolloClient();
  const [currentUserName, setCurrentUserName] = useState(
    localStorage.getItem("username"),
  );

  if (loading) return "loading...";

  const onLogout = () => {
    setToken(null);
    setCurrentUserName("");
    localStorage.clear();
    client.resetStore(); // resets the apollog client cache
  };

  const notify = (message) => {
    setErrorMessage(message);
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
      <Notify errorMessage={errorMessage} />
      <div>
        <span>{currentUserName} </span>
        <button onClick={onLogout}>logout</button>
      </div>
      <Persons persons={data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  );
}

export default App;
