  const LoginForm = ({handleSubmit, username, setUsername, password, setPassword}) => (
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

export default LoginForm