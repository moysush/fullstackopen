import { useContext } from "react";
import { NotificationContext } from "../NotificationContext";

const Notification = () => {
  const notification = useContext(NotificationContext);

  return (
    <div>
      {notification && (
        <div
          className={
            notification.includes("successfully") ? "success" : "error"
          }
        >
          {notification}
        </div>
      )}
    </div>
  );
};

export default Notification;
