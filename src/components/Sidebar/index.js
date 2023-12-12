import React from "react";
import { Menu } from "antd";
import { CheckSquareOutlined, BarsOutlined, FireOutlined } from '@ant-design/icons';

import "./Sidebar.scss";
import { useTranslation } from "react-i18next";
import { redirect, Link } from "react-router-dom";
const items = (t) => [
  {
    label: <Link to={"/"}>{t("sidebar.daily")}</Link>,
    key: "daily",
    icon: <CheckSquareOutlined />
  },
  {
    label: <Link to={"actions"}>{t("sidebar.actions")}</Link>,
    key: "actions",
    icon:<BarsOutlined />
  },
  {
    label: <Link to={"episodes"}>{t("sidebar.command")}</Link>,
    key: "command",
    icon: <FireOutlined />
  }
];

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <div className="sidebar">
      <Menu items={items(t)} defaultSelectedKeys={["daily"]} mode="horizontal" />
    </div>
  );
};
export default Sidebar;
