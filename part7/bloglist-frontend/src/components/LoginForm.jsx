import { useState } from "react";

const LoginForm = ({ userData }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    userData({
      username: username,
      password: password,
    });

    setUsername("");
    setPassword("");
  };
  return (
    <div
      id="login"
      className="bg-white p-8 rounded-2xl backdrop-blur-md shadow-md"
    >
      <div>
        <h1 className="text-4xl font-black text-violet-700 tracking-tighter text-center">
          BlogApp
        </h1>
        <h2 className="text-center m-3 text-lg font-semibold text-slate-600">
          Welcome back, please login.
        </h2>
        <form onSubmit={handleLogin}>
          <div className="">
            <label className="">
              <input
                className="w-full p-2 my-3 shadow-lg rounded-lg border-2 border-slate-300 hover:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300"
                value={username}
                type="username"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </label>
          </div>
          <div>
            <label>
              <input
                className="w-full p-2 mb-3 shadow-lg rounded-lg border-2 border-slate-400 hover:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </label>
          </div>
          <button
            type="submit"
            className="p-2 cursor-pointer text-slate-600 bg-violet-600/80 hover:bg-violet-700 w-full backdrop-blur-md rounded-full text-white shadow-md hover:scale-105 transition-all font-bold shadow-violet-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
