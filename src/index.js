import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import TopBanner from "./pages/Homepage";
import { createHashRouter, RouterProvider, } from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <TopBanner />,
        index: true
      },
      // {
      //   path: "/episodes",
      //   element: <FeedPage />
      // },
      // {
      //   path: "/headline",
      //   element: <FeedPage />
      // }
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
