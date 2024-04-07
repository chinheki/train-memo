import React from "react";
import { Menu } from "antd";
import { CheckSquareOutlined, BarsOutlined, FireOutlined } from '@ant-design/icons';

import "./Sidebar.scss";
import { useTranslation } from "react-i18next";
import { redirect, Link } from "react-router-dom";
import { useLocation } from "react-router";
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
  const location =useLocation();
  
  const defaultSelectedKeys=location.pathname.includes("week")?"daily":location.pathname.includes("sports")?"sports":"actions"
  return (
    <div className="sidebar">
      <Menu items={items(t)} defaultSelectedKeys={[defaultSelectedKeys]} mode="horizontal" />
    </div>
  );
};
export default Sidebar;
