import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AdminDataProvider } from "./context/AdminDataContext.jsx";
import "./styles.css";
import "./styles/admin.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminDataProvider>
        <App />
      </AdminDataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
