import React, { useState,useMemo,useEffect } from "react";
import { PlusOutlined, DeleteTwoTone } from "@ant-design/icons";
import { Button, Image, Upload } from "antd";



const Images = ({fileList,dec}) => {
  const scroll = useMemo(() => fileList.length+(!!dec?1:0) > 1, [fileList,dec])
  const scrollList= useMemo(() => [...fileList.map(f=>({type:"img",file:f})),...(!!dec?[{type:"text",file:dec}]:[])], [fileList,dec])
  const [index,setIndex] = useState(0)
 useEffect(() => {
   let intervalId;
   if (scroll) {
     intervalId = setInterval(() => {
       setIndex(prev => prev+1 === scrollList.length ? 0 : prev + 1)
     },3000)
  }
  return () => {
    clearInterval(intervalId)
  }
 }, [scroll])
  return (
    <>
      {scrollList[index] &&
        <div className="imagesForShowRow">
          {scrollList[index].type === "img" && <img src={fileList[index].src} />}
          {scrollList[index].type === "text" && <div >{dec}</div>}
        </div>
      }
        </>
  );
};
export default Images;
