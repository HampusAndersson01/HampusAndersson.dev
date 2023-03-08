import React from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import "./index.css";
import { DarkModeProvider } from "./context/DarkMode";

const router = createHashRouter(
  [
    {
      path: "/",
      element: <HomePage></HomePage>,
    },
    {
      path: "about",
      element: <AboutPage></AboutPage>,
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

createRoot(document.getElementById("root") as HTMLElement).render(
  <DarkModeProvider>
    <RouterProvider router={router} />
  </DarkModeProvider>
);
