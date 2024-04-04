import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import WeeklyTrain from "./pages/WeeklyTrain";
import { createHashRouter, RouterProvider, } from "react-router-dom";
import TrainBoard from "./pages/TrainBoard";
import SportsList from "./pages/Sports";
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <WeeklyTrain />,
        path: "/week",
      },
      {
        index: true,
        element: <TrainBoard />
      },
      {
        path: "/sports",
        element: <SportsList />
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
