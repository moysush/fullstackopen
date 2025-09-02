import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm.jsx'
import BlogForm from './components/BlogForm.jsx'
import Togglable from './components/Togglable.jsx'

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
  const blogFormRef = useRef()

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
      setError(`${userData.name} successfully logged in`)
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
    catch (err) {
      setError('invalid username or password')
      setTimeout(() => {
        setError(null)
      }, 5000)
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
      const blog = await blogService.create(newBlog, token)
      // hide after creating new blog
      blogFormRef.current.toggleVisibility()
      // concat new blog with the existing blogs fetched initially
      blogs.concat(blog)
      setError(`a new blog, ${title} by ${author} was added successfully`)
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
    catch (err) {
      setError('error creating a new blog')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const Notification = () => (
    <div>
      {error &&
        <div className={error.includes('successfully') ? 'success' : 'error'}>
          {error}
        </div>}
    </div>
  )

  return (
    <div>
      <Notification />

      <h2>Blogs</h2>

      {!user && <LoginForm handleSubmit={handleSubmit} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />}


      {user &&
        (<div id='blogs'>
          <p>{user.name} logged in <button onClick={() => { setUser(window.localStorage.removeItem('loggedBlogappUser')); setUser(null); setToken(null) }}>Logout</button></p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
            <BlogForm title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} handleCreate={handleCreate} />
          </Togglable>
        </div>)
      }

    </div>
  )
}

export default App