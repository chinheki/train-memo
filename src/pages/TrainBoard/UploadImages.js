import React, { useState } from "react";
import { PlusOutlined, DeleteTwoTone } from "@ant-design/icons";
import { Button, Image, Upload } from "antd";



const UploadImages = ({fileList, setFileList}) => {
  const onUpload = async () => {
    const handle = await window.showOpenFilePicker({
      types: [
        {
          description: "Images",
          accept: {
            "image/*": [".png", ".gif", ".jpeg", ".jpg"]
          }
        }
      ],
      excludeAcceptAllOption: true,
      multiple: true
    });
    const file = await handle[0].getFile();
    const src = URL.createObjectURL(file);
    setFileList((prev) => [...prev, { src, file }]);
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

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none"
      }}
      type="button"
    >
      <PlusOutlined />
    </button>
  );
  return (
    <>
      {fileList.map((image, i) => (
        <div className="imageFrame" onClick={() => deleteImage(image)}>
          <DeleteTwoTone twoToneColor="brown" />
          <img id={"frame-" + i} src={image.src} width="100px" height="100px" />
        </div>
      ))}
      <Button onClick={onUpload}>
        {fileList.length >= 8 ? null : uploadButton}
      </Button>
      {/* {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )} */}
    </>
  );
};
export default UploadImages;
