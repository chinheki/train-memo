import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "./App.scss";
import "./i18n";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="right">
        <Header />
        <div id="detail">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
