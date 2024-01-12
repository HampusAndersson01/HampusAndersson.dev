import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./index.css";
import { Analytics } from "@vercel/analytics/react";
import PortfolioPage from "./pages/PortfolioPage";
import Header from "./components/Header";

createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <Header />
    <div className="main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </div>
    <Analytics />
  </Router>
);
