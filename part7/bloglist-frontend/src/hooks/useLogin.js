import { useReducer } from "react";

const loginReducer = (state, action) => {
  if (action.type === "setUser") {
    return { ...state, user: action.payload };
  } else if (action.type === "setToken") {
    return { ...state, token: action.payload };
  } else if (action.type === "clear") {
    return { user: null, token: null };
  }

  throw Error("Unknown action");
};

export const useLogin = () => {
  const [login, loginDispatch] = useReducer(loginReducer, {
    user: null,
    token: null,
  });

  const setLogin = (user) => {
    loginDispatch({ payload: user, type: "setUser" });
    loginDispatch({ payload: user.token, type: "setToken" });
  };

  const setLogout = () => {
    loginDispatch({ type: "clear" });
  };

  return [login, setLogin, setLogout];
};
