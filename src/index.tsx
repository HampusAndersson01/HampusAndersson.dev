import React from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./pages/HomePage";
import "./index.css";

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>
);
