import React from "react";
import Sidebar from "./components/Sidebar";
import "./App.css";
import "./i18n";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <>
      <Sidebar />
      <div className="content">
          <Outlet />
      </div>
    </>
  );
};

export default App;
