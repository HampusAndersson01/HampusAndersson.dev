import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import "./index.css";
import { DarkModeContext, DarkModeProvider } from "./context/DarkMode";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "about",
    element: <AboutPage></AboutPage>,
  },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <DarkModeProvider>
    <RouterProvider router={router} />
  </DarkModeProvider>
);
