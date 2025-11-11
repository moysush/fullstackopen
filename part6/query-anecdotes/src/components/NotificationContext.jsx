import { createContext, useReducer } from "react";

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
    switch (action.type) {
      case "CREATED":
        return `Anecdote '${action.payload}' is created.`
      case "VOTED":
        return `Anecdote '${action.payload}' is voted.`
      case "CLEAR":
        return ""
      case "ERROR":
        return `${action.payload}`
      default:
        return state
    }
  }

  export const NotificationContextProvider = (props) => {
      const [notification, notificationDispatch] = useReducer(notificationReducer, "")
    return(
        <NotificationContext value={{notification, notificationDispatch}}>
            {props.children}
        </NotificationContext>
    )
  }

export default NotificationContext