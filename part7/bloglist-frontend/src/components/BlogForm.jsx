import { useState } from "react";

const BlogForm = ({ newBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();

    newBlog({
      title: title,
      author: author,
      url: url,
    });
  };

  return (
    <div id="create">
      <h3>Create New</h3>
      <div>
        <label>
          Title:
          <input
            value={title}
            type="text"
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Author:
          <input
            value={author}
            type="text"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          URL:
          <input
            value={url}
            type="text"
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <button
        className="mx-auto block text-lg bg-violet-600/80 hover:bg-violet-700 text-white font-bold px-8 py-4 rounded-full shadow-2xl shadow-violet-300 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 whitespace-nowrap backdrop-blur-md"
        onClick={handleCreate}
      >
        Create
      </button>
    </div>
  );
};

export default BlogForm;
