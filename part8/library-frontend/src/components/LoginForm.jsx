import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../queries";

const LoginForm = ({ show, setNotify, setPage, setUserLogged }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value;
      setUserLogged(username);
      localStorage.setItem("library-user-token", token);
      localStorage.setItem("library-user", username);

      setUsername("");
      setPassword("");
      setPage("authors");
    },
    onError: (error) => {
      setNotify(error.message);
    },
  });

  if (!show) {
    return null;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(username, password);

    login({ variables: { username: username, password: password } });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            value={username}
            placeholder="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
