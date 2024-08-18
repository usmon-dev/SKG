import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import SKGProvider from "./context/SKG.tsx";
import UserProvider from "./context/Users.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <UserProvider>
      <SKGProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </SKGProvider>
    </UserProvider>
  </BrowserRouter>
);
