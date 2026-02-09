import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from "../queries";
import { updateBooks } from "../../utils/updateBooks";

const NewBook = ({ setNotify, show }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [addBook, { loading }] = useMutation(ADD_BOOK, {
    // refetchQueries: [ALL_BOOKS, ALL_AUTHORS],
    update: (cache, data) => {
      updateBooks(cache, data.data.addBook);
    },
    onError: (error) => {
      setNotify(error.message);
    },
  });

  if (loading) return "Submitting...";

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    addBook({
      variables: {
        title: title,
        author: author,
        published: published ? parseInt(published) : null,
        genres: genres,
      },
    });
    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
