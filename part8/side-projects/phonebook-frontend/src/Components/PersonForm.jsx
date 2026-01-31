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
    // refetchQueries: [{ query: ALL_PERSONS }],
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
        return { allPersons: allPersons.concat(response.data.addPerson) };
      });
    },
    onError: (error) => setError(error.message),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault(); // if not set, it removes the initial values with the page refresh

    savePerson({
      variables: {
        ...form,
        phone: form.phone.length < 0 ? form.phone : undefined,
      },
    });
    setForm({
      name: "",
      street: "",
      city: "",
      phone: "",
    });
  };

  return (
    <form onSubmit={submit}>
      <div>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="name"
        />
      </div>
      <div>
        <input
          name="street"
          value={form.street}
          onChange={handleChange}
          placeholder="street"
        />
      </div>
      <div>
        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="city"
        />
      </div>
      <div>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="phone"
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default PersonForm;
