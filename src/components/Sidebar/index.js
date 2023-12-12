import React from "react";
import { Menu } from "antd";
import EpisodeIcon from "./episode.svg";
import HeadlineIcon from "./headline.svg";
import FeedIcon from "./feed.svg";
import Logo from "./logo.svg";
import "./Sidebar.scss";
import { useTranslation } from "react-i18next";
import { redirect, Link } from "react-router-dom";
const items = (t) => [
  {
    label: <Link to={"/"}>{t("sidebar.feed")}</Link>,
    key: "feed",
    icon: <FeedIcon />
  },
  {
    label: <Link to={"headline"}>{t("sidebar.headline")}</Link>,
    key: "headline",
    icon: <HeadlineIcon />
  },
  {
    label: <Link to={"episodes"}>{t("sidebar.episodes")}</Link>,
    key: "episodes",
    icon: <EpisodeIcon />
  }
];

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <div className="sidebar">
      <Logo />
      <Menu items={items(t)} theme="dark" defaultSelectedKeys={["feed"]} />
    </div>
  );
};
export default Sidebar;
