import React, { useState } from "react";
import { PlusOutlined, DeleteTwoTone } from "@ant-design/icons";
import { Button, Image, Upload } from "antd";

function isUploadSupported() {
    if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) {
        return false;
    }
    var elem = document.createElement('input');
    elem.type = 'file';
    return !elem.disabled;
};

const UploadImages = ({fileList, setFileList}) => {
  const onUpload =async  (e) => {
    const file=e.target.files[0]
    // return;
    // // if (isUploadSupported()) {
    //   const handle = await window.showOpenFilePicker({
    //     types: [
    //     {
    //       description: "Images",
    //       accept: {
    //         "image/*": [".png", ".gif", ".jpeg", ".jpg"]
    //       }
    //     }
    //   ],
    //   excludeAcceptAllOption: true,
    //   multiple: true
    //   }).catch((e) => { console.log(e) });
    //   if (!handle) return;
    //   const file = await handle[0].getFile();
    if (!file) return;
    const src = URL.createObjectURL(file);
    setFileList((prev) => [...prev, { src, file }]);
  //   } else {
      
  // }
  };
  const deleteImage = (image) => {
    const updatedPreviewImage = fileList.filter((img) => 
        img.src === image.src && !!img.file
      ).map(
      (img) => {
        if (img.src === image.src && !img.file) {
          return {...img,needDelete:true}
        }
      }
    );
    setFileList(updatedPreviewImage);
  };

  return (
    <>
      {fileList.map((image, i) => (
        <div className="imageFrame" onClick={() => deleteImage(image)}>
          <DeleteTwoTone twoToneColor="brown" />
          <img id={"frame-" + i} src={image.src} width="100px" height="100px" />
        </div>
      ))}
      {/* <Button onClick={onUpload}>
      <PlusOutlined />
      </Button> */}
      <input id="myFileInput" type="file" accept="image/*" onChange={onUpload}></input>
    </>
  );
};
export default UploadImages;
