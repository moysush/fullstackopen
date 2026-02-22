export const Notification = ({ message }: { message: string }) => {
  return (
    <p
      style={message.includes("Error") ? { color: "red" } : { color: "green" }}
    >
      {message}
    </p>
  );
};
