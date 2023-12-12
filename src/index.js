import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import WeeklyTrain from "./pages/WeeklyTrain";
import { createHashRouter, RouterProvider,createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <WeeklyTrain />,
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
