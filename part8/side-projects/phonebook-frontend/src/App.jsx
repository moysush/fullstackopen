import { useQuery } from "@apollo/client/react";
import Persons from "./Components/Persons";
import PersonForm from "./Components/PersonForm";
import { ALL_PERSONS } from "./queries";
import Notify from "./Components/Notify";
import { useState } from "react";
import PhoneForm from "./Components/PhoneForm";

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const { data, loading } = useQuery(ALL_PERSONS);

  if (loading) return "loading...";

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <Persons persons={data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  );
}

export default App;
