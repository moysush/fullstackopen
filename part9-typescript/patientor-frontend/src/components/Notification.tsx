import { Alert } from "@mui/material";

export const Notification = ({ message }: { message: string }) => {
  return (
    <>
      {message && (
        <Alert
          severity={message.includes("Error") ? "error" : "success"}
          sx={{ my: 2 }}
        >
          {message}
        </Alert>
      )}
    </>
  );
};
