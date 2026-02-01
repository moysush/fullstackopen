import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

const Books = ({ show, setNotify }) => {
  const { data, loading } = useQuery(ALL_BOOKS, {
    onError: (error) => {
      setNotify(error.message);
    },
  });
  const [genre, setGenre] = useState("all");

  if (!show) {
    return null;
  }

  if (loading) return <p>Loading...</p>;
  // if (error) return setNotify(error.message);

  const booksToShow =
    genre === "all"
      ? data.allBooks
      : data.allBooks.filter((b) => b.genres.includes(genre));

  return (
    <div>
      <h2>Books</h2>
      <p>
        in genre <b>{genre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {booksToShow.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {data?.allBooks &&
          [...new Set(data.allBooks.flatMap((b) => b.genres))].map((g, i) => (
            <button key={`${g}+${i}`} onClick={() => setGenre(g)}>
              {g}
            </button>
          ))}
        <button onClick={() => setGenre("all")}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
