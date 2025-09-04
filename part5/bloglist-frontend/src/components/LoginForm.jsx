import { useState } from 'react'

const LoginForm = ({ userData }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    userData({
      username: username,
      password: password
    })

    setUsername('')
    setPassword('')
  }
  return (
    <div id="login">
      <h2>log in to the application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username
            <input value={username} type='text' onChange={e => setUsername(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input value={password} type='text' onChange={e => setPassword(e.target.value)} />
          </label>
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
export default LoginForm