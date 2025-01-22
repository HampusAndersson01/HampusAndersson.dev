import React from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./pages/HomePage";
import "./index.css";
import { SpeedInsights } from "@vercel/speed-insights/react"

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <HomePage />
    <SpeedInsights />
  </React.StrictMode>
  
);
