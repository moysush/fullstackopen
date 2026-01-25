import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_PERSON, ALL_PERSONS } from "../queries";

const PersonForm = ({ setError }) => {
  const [form, setForm] = useState({
    name: "",
    street: "",
    city: "",
    phone: "",
  });

  const [savePerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => setError(error.message),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault(); // if not set, it removes the initial values with the page refresh

    savePerson({ variables: { ...form } });
    setForm({
      name: "",
      street: "",
      city: "",
      phone: "",
    });
  };

  return (
    <form onSubmit={submit}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="name"
      />
      <input
        name="street"
        value={form.street}
        onChange={handleChange}
        placeholder="street"
      />
      <input
        name="city"
        value={form.city}
        onChange={handleChange}
        placeholder="city"
      />
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="phone"
      />
      <button type="submit">add!</button>
    </form>
  );
};

export default PersonForm;
