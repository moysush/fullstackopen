import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm.jsx'
import BlogForm from './components/BlogForm.jsx'
import Togglable from './components/Togglable.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [token, setToken] = useState(null)
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

  // user login
  const handleLogin = async (userData) => {

    try {
      const loggedUser = await loginService.login(userData)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedUser))
      setUser(loggedUser)
      setToken(loggedUser.token)
      setError(`${loggedUser.name} successfully logged in`)
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
    catch (err) {
      setError(`invalid username or password; ${err}`)
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  // new blog
  const handleCreate = async (newBlog) => {

    try {
      const blog = await blogService.create(newBlog, token)
      // concat new blog with the existing blogs fetched initially
      setBlogs(blogs.concat({ ...blog, user })) // show the user's name with user
      // hide form after creating new blog
      blogFormRef.current.toggleVisibility()
      setError(`a new blog, ${blog.title} by ${blog.author} was added successfully`)
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
    catch (err) {
      setError(`error creating a new blog; ${err}`)
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const handleDelete = async (e, blogToDelete) => {
    e.preventDefault()
    // only delete the blog if the condition returns true
    if (window.confirm(`Remove blog: ${blogToDelete.title}?`)) {
      try {
        await blogService.remove(blogToDelete, token)
        setBlogs(blogs.filter(blog => blog !== blogToDelete))
        setError(`blog ${blogToDelete.title} was deleted successfully`)
        setTimeout(() => {
          setError(null)
        }, 5000)
      }
      catch (err) {
        setError(`blog could not be removed ${err}`)
        setTimeout(() => {
          setError(null)
        }, 5000)
      }
    }

  }

  const handleLikes = async (updateLikes) => {
    try {
      const updatedBlog = await blogService.update(updateLikes, token)
      setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? { ...updatedBlog, user: blog.user } : blog))
    }
    catch (err) {
      setError(`error updating the blog; ${err}`)
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

      {!user &&
        <Togglable buttonLabel="Log In">
          <LoginForm userData={handleLogin} />
        </Togglable>
      }


      {user &&
        (<div id='blogs'>
          <p>{user.name} logged in <button onClick={() => { setUser(window.localStorage.removeItem('loggedBlogappUser')); setUser(null); setToken(null) }}>Logout</button></p>
          {blogs
            .slice()
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <Blog key={blog.id} blog={blog} handleDelete={handleDelete} updatelikes={handleLikes} currentUser={user} />
            )}
          <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
            <BlogForm newBlog={handleCreate} />
          </Togglable>
        </div>)
      }

    </div>
  )
}

export default App