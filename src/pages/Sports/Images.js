import React, { useState } from "react";
import { PlusOutlined, DeleteTwoTone } from "@ant-design/icons";
import { Button, Image, Upload } from "antd";



const Images = ({fileList}) => {

 
  return (
    <div className="imagesForShowRow">
      {fileList.map((image, i) => (
        <div className="imageFrameForShow">
          <img key={"frame-" + i} src={image.src} width="100%" />
        </div>
      ))}

    </div>
  );
};
export default Images;
