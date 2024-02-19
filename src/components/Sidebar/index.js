import React from "react";
import { Menu } from "antd";

import "./Sidebar.css";
import { useTranslation } from "react-i18next";
import { redirect, Link } from "react-router-dom";
const items = (t) => [
  {
    label: <Link to={"/"}>Protfolio</Link>,
    key: "protfolio",
  },
  {
    label: <Link to={"actions"}>Team</Link>,
    key: "team",
  },
  {
    label: <Link to={"episodes"}>Writting press</Link>,
    key: "press",
  }
];

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <div className="sidebar">
      <Menu items={items(t)} defaultSelectedKeys={["protfolio"]} mode="horizontal" />
    </div>
  );
};
export default Sidebar;
