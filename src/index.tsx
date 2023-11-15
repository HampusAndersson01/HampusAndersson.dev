import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import "./index.css";
import { DarkModeProvider } from "./context/DarkMode";
import { Analytics } from '@vercel/analytics/react';

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "about",
    element: <AboutPage />,
  },
];

const router = createBrowserRouter(routes, {
  basename: process.env.PUBLIC_URL,
});

createRoot(document.getElementById("root") as HTMLElement).render(
  <DarkModeProvider>
    <RouterProvider router={router} />
    <Analytics />
  </DarkModeProvider>
);
