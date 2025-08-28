import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // login user details
    const newUser = {
      username: username,
      password: password
    }

    const userData = await loginService.login(newUser)
    setUser(userData)
    setUsername('')
    setPassword('')
  }

  const loginForm = () => (
    <div id="login">
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
      {!user && loginForm()}

      {user &&
        (<div id='blogs'>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>)
      }
    </div>
  )
}

export default App