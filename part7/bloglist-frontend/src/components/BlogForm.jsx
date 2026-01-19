import { useState } from "react";

const BlogForm = ({ newBlog, toggleVisibility }) => {
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

    toggleVisibility();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur transition-all"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          toggleVisibility();
        }
      }}
    >
      <div id="create" className="bg-white p-10 rounded-lg shadow-md">
        <h3 className="font text-2xl font-bold tracking-tight text-violet-700">
          Create New Blog
        </h3>
        <p className="mb-5 text-slate-600">Share your latest thoughts...</p>
        <form onSubmit={handleCreate} className="space-y-6 mt-3">
          <div>
            <label className="tracking-tighter text-slate-600 text-sm font-semibold">
              TITLE
            </label>
            <input
              required
              className="w-full p-2 shadow focus:outline-none border-1 border-slate-300 focus:border-violet-300 focus:shadow-violet-300 rounded-lg"
              value={title}
              type="text"
              onChange={({ target }) => setTitle(target.value)}
              placeholder="Blog title"
            />
          </div>
          <div>
            <label className="tracking-tighter text-slate-600 text-sm font-semibold">
              AUTHOR
            </label>
            <input
              required
              className="w-full p-2 shadow focus:outline-none border-1 border-slate-300 focus:border-violet-300 focus:shadow-violet-300 rounded-lg"
              value={author}
              type="text"
              onChange={({ target }) => setAuthor(target.value)}
              placeholder="Author name"
            />
          </div>
          <div>
            <label className="tracking-tighter text-slate-600 text-sm font-semibold">
              URL
            </label>
            <input
              required
              className="w-full p-2 shadow focus:outline-none border-1 border-slate-300 focus:border-violet-300 focus:shadow-violet-300 rounded-lg"
              value={url}
              type="text"
              onChange={({ target }) => setUrl(target.value)}
              placeholder="https://example.com/my-blog"
            />
          </div>
          <button
            className="w-full block text-lg bg-violet-600/80 hover:bg-violet-700 text-white font-bold flex justify-center cursor-pointer py-2 rounded-full shadow-2xl shadow-violet-300 transition-all hover:scale-105 active:scale-95 flex items-center whitespace-nowrap backdrop-blur-md"
            type="submit"
          >
            + Publish Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
