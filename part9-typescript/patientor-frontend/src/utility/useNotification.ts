import { useState } from "react";

export function useNotification(
  timeout = 5000,
): [string, (msg: string) => void] {
  const [message, setMessage] = useState("");
  const notify = (msg: string) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, timeout);
  };
  return [message, notify];
}
