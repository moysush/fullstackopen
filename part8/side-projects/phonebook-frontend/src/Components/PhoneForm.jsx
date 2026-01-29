import { useMutation } from "@apollo/client/react";
import { EDIT_NUMBER } from "../queries";
import { useState } from "react";

const PhoneForm = ({ setError }) => {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [editNumber] = useMutation(EDIT_NUMBER, {
    onCompleted: (data) => {
      if (!data.editNumber) {
        setError("person not found");
      }
      setForm({ name: "", phone: "" });
    },
    onError: (error) => setError(error.message),
  });

  const submit = (e) => {
    e.preventDefault();

    editNumber({ variables: { ...form } });
    setForm({ name: "", phone: "" });
  };

  return (
    <div>
      <h2>Change number</h2>
      <form onSubmit={submit}>
        <div>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="name"
          />
        </div>
        <div>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="phone"
          />
        </div>
        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default PhoneForm;
