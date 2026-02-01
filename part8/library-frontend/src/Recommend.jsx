import { ALL_BOOKS, ME } from "./queries";
import { useQuery } from "@apollo/client/react";

const Recommend = ({ show, setNotify }) => {
  const { data: userData } = useQuery(ME, {
    skip: !show, // only runs when show is true.
    onError: (error) => {
      setNotify(error.message);
    },
  });
  const { data: booksData } = useQuery(ALL_BOOKS);
  const favoriteGenre = userData?.me?.favoriteGenre;

  const booksToShow = booksData?.allBooks?.filter((b) =>
    b.genres.includes(favoriteGenre),
  );

  if (!show) return null;

  return (
    <div>
      <h2>Recommend</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {booksToShow?.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
