import React, { useState, useMemo, useEffect } from "react";
import { PlusOutlined, DeleteTwoTone } from "@ant-design/icons";
import { Button, Image, Upload } from "antd";
import "./Images.scss";
const Images = ({ fileList, dec }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let intervalId;
    if (fileList.length > 1) {
      intervalId = setInterval(() => {
        setIndex((prev) => (prev === fileList.length - 1 ? 0 : prev + 1));
      }, 6000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [fileList]);
  useEffect(() => {
    let intervalId;
    if (dec?.length) {
      intervalId = setInterval(() => {
        const p = document.getElementById("dec-squre-container");
        const e = document.getElementById("dec-squre");
        if (e && p && e.scrollHeight > p.getBoundingClientRect().height) {
          if (e.scrollTop + p.getBoundingClientRect().height < e.scrollHeight) {
            e.scrollTop += p.getBoundingClientRect().height;
          } else {
            e.scrollTop = 0;
          }
        } else {
          clearInterval(intervalId);
        }
      }, 10000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [dec]);
  return (
    <>
      {dec && (
        <div id="dec-squre-container" className="decForShowRow">
          <div id="dec-squre">{dec}</div>
        </div>
      )}
      {fileList[index] && (
        <div className="imagesForShowRow">
          {<img src={fileList[index].src} />}
        </div>
      )}
    </>
  );
};
export default Images;
