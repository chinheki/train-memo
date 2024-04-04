import React from "react";
import { Menu } from "antd";

import "./Sidebar.css";
import { useTranslation } from "react-i18next";
import { redirect, Link } from "react-router-dom";
const items = (t) => [
  {
    label: <Link to={"/"}>{t("sidebar.command")}</Link>,
    key: "actions",
    icon: <FireOutlined />
  },
  {
    label: <Link to={"week"}>{t("sidebar.daily")}</Link>,
    key: "daily",
    icon: <CheckSquareOutlined />
  },
  {
    label: <Link to={"sports"}>{t("sidebar.actions")}</Link>,
    key: "sports",
    icon:<BarsOutlined />
  }
];

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <div className="sidebar">
      <Menu items={items(t)} defaultSelectedKeys={["actions"]} mode="horizontal" />
    </div>
  );
};
export default Sidebar;
