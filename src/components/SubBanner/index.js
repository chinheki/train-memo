import React from "react";
import { Carousel } from "antd";

const SubManner = () => {
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

export default SubManner;
