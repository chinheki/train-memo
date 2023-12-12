import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import FeedPage from "./pages/feed";
import { createHashRouter, RouterProvider } from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <FeedPage />,
        index: true
      },
      {
        path: "/episodes",
        element: <FeedPage />
      },
      {
        path: "/headline",
        element: <FeedPage />
      }
    ]
  }
]);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
