import React from "react";
import "./Header.scss";
import { useTranslation } from "react-i18next";
import { SearchOutlined, GlobalOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input } from "antd";
const lanMenu = (t) => [
  {
    key: "ko",
    label: t("header.lan.ko")
  },
  {
    key: "en",
    label: t("header.lan.en")
  }
];

const Header = () => {
  const { t, i18n } = useTranslation();
  const onLanSelected = (c) => {
    i18n.changeLanguage(c.key);
  };
  return (
    <div className="header">
      <Input
        className="search"
        placeholder={t("header.search.placeholder")}
        suffix={<SearchOutlined />}
      />
      <div className="right">
        <Dropdown
          menu={{
            items: lanMenu(t),
            selectable: true,
            defaultSelectedKeys: ["ko"],
            onSelect: onLanSelected
          }}
        >
          <GlobalOutlined />
        </Dropdown>
        <Button>{t("header.signup")}</Button>
        <Button>{t("header.login")}</Button>
      </div>
    </div>
  );
};
export default Header;
