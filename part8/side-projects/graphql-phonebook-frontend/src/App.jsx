import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Persons from "./Components/Persons";

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;
function App() {
  const { data, loading } = useQuery(ALL_PERSONS);
  if (loading) return "loading...";
  return (
    <>
      <Persons persons={data.allPersons} />
    </>
  );
}

export default App;
