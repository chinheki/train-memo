import React from "react";
import { Carousel } from "antd";
import { Link } from "react-router-dom";
import "./MainBanner.scss";

const MainBanner = () => {
  const list = [
    { src: "", url: "" },
    { src: "", url: "" },
    { src: "", url: "" },
    { src: "", url: "" },
    { src: "", url: "" }
  ];
  return (
    <Carousel autoplay autoplaySpeed={5000}>
      {list.map((c) => (
        <div className="banner-content">
          <img src={c.src} />
        </div>
      ))}
    </Carousel>
  );
};

export default MainBanner;
