import { useSelector } from "react-redux";

export const Notification = () => {
  const notification = useSelector((state) => state.notification);
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
