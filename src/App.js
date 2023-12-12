import React from "react";
import Sidebar from "./components/Sidebar";
import "./App.scss";
import "./i18n";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <>
      <div className="content">
          <Outlet />
      </div>
      <Sidebar />
    </>
  );
};

export default App;
