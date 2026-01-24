import { useQuery } from "@apollo/client/react";
import Persons from "./Components/Persons";
import PersonForm from "./Components/PersonForm";
import { ALL_PERSONS } from "./queries";

function App() {
  const { data, loading } = useQuery(ALL_PERSONS);
  if (loading) return "loading...";
  return (
    <>
      <Persons persons={data.allPersons} />
      <PersonForm />
    </>
  );
}

export default App;
