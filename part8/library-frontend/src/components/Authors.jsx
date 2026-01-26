import { useQuery } from "@apollo/client/react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../query";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";

const Authors = (props) => {
  const { data, loading, error } = useQuery(ALL_AUTHORS);
  const [form, setForm] = useState({ name: "", born: "" });
  const [editAuthor] = useMutation(EDIT_AUTHOR);

  if (!props.show) {
    return null;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const submit = (e) => {
    e.preventDefault();

    editAuthor({
      variables: { name: form.name, setBornTo: parseInt(form.born) },
    });

    setForm({ name: "", born: "" });
  };

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set Birth Year</h2>
      <form onSubmit={submit}>
        <div>
          <select name="name">
            {data.allAuthors.map((a) => {
              return (
                <option
                  value={a.name}
                  key={a.id}
                  onClick={() => {
                    setForm({ ...form, name: a.name });
                  }}
                >
                  {a.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <input
            name="born"
            value={form.born}
            onChange={({ target }) => {
              setForm({ ...form, [target.name]: target.value });
            }}
            placeholder="born"
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
