import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import { Analytics } from "@vercel/analytics/react";
import App from "./App";

createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <div className="main">
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} /> */}
      </Routes>
    </div>
    <Analytics />
  </Router>
);
