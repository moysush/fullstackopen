import { useState } from "react"

const BlogForm = ({ newBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

    const handleCreate = async (e) => {
    e.preventDefault()

    newBlog({
      title: title,
      author: author,
      url: url
    })

  }

  return (
    <div id="create">
      <h3>Create New</h3>
      <div>
        <label>
          Title:
          <input value={title} type='text' onChange={({ target }) => setTitle(target.value)} />
        </label>
      </div>
      <div>
        <label>
          Author:
          <input value={author} type='text' onChange={({ target }) => setAuthor(target.value)} />
        </label>
      </div>
      <div>
        <label>
          Url:
          <input value={url} type='text' onChange={({ target }) => setUrl(target.value)} />
        </label>
      </div>
      <button onClick={handleCreate}>Create</button>
    </div>
  )
}

export default BlogForm