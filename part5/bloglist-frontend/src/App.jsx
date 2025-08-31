import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [token, setToken] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const userData = JSON.parse(loggedUserJSON)
      setUser(userData)
      setToken(userData.token)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // login user details
    const newUser = {
      username: username,
      password: password
    }

    try {
      const userData = await loginService.login(newUser)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(userData))
      setUser(userData)
      setToken(userData.token)
      setUsername('')
      setPassword('')
      setError(null)
    }
    catch (err) {
      setError('invalid username or password', err)
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    try {
      await blogService.create(newBlog, token)
      console.log(newBlog, token);
      
    }
    catch (err) {
      setError('error creating new blog')
    }
  }

  const loginForm = () => (
    <div id="login">
      <h2>log in to the application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            username
            <input value={username} type='text' onChange={e => setUsername(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            password
            <input value={password} type='text' onChange={e => setPassword(e.target.value)} />
          </label>
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {!user && loginForm()}

      {user &&
        (<div id='blogs'>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={() => {setUser(window.localStorage.removeItem('loggedBlogappUser')); setUser(null); setToken(null)}}>logout</button></p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>)
      }
      <div>
        <h2>create new</h2>
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
        <button onClick={handleCreate}>create</button>
      </div>
    </div>
  )
}

export default App