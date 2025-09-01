const LoginForm = ({ handleLogin, username, handleUsernameChange, password, handlePasswordChange }) => (
  <div id="login">
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type='text'
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
)

export { LoginForm }