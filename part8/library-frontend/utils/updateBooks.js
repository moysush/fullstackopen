import { ALL_AUTHORS, ALL_BOOKS } from "../src/queries";

export const updateBooks = (cache, data) => {
  const updateGenreQuery = (genre) => {
    cache.updateQuery(
      { query: ALL_BOOKS, variables: { genre: genre } },
      ({ allBooks }) => {
        const bookExists = allBooks.some((b) => b.id === data.id);

        if (bookExists) {
          return { allBooks };
        }

        return { allBooks: allBooks.concat(data) };
      },
    );
  };

  // updating each queries separately.
  updateGenreQuery(null);
  data.genres.forEach(updateGenreQuery);
};
