import { useReducer } from "react";

// notification reducer
const notifReducer = (state, action) => {
  if (action.type === "setMessage") {
    return action.payload;
  } else if (action.type === "clear") {
    return null;
  }
  throw Error("Unknown action.");
};

export const useNotification = () => {
  // useReducer for notification
  const [notification, notifDispatch] = useReducer(notifReducer, null);
  // clean function for the notification setting with timeout
  const setNotification = (state, action, seconds = 5) => {
    notifDispatch({ type: `${action}`, payload: state });
    setTimeout(() => {
      notifDispatch({ type: "clear", payload: null });
    }, seconds * 1000);
  };

  return [notification, setNotification];
};
