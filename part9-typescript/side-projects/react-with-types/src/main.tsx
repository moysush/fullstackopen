import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

interface WelcomeProps {
  name: string
}

// eslint-disable-next-line react-refresh/only-export-components
const Welcome = ({ name }: WelcomeProps) => {
  return <h1>Hello, {name}!</h1>;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Welcome name={"Sush"} />
    <App />
  </StrictMode>,
);
