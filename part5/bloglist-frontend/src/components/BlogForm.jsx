  const BlogForm = ({title, setTitle, author, setAuthor, url, setUrl, handleCreate}) => {
    return (
      <div id="create">
        <h2>Create New</h2>
        <div>
          <label>
            title:
            <input value={title} type='text' onChange={({ target }) => setTitle(target.value)} />
          </label>
        </div>
        <div>
          <label>
            author:
            <input value={author} type='text' onChange={({ target }) => setAuthor(target.value)} />
          </label>
        </div>
        <div>
          <label>
            url:
            <input value={url} type='text' onChange={({ target }) => setUrl(target.value)} />
          </label>
        </div>
        <button onClick={handleCreate}>Create</button>
      </div>
    )
  }

export default BlogForm