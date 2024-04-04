import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Image, Upload } from "antd";
import { updateMedia } from "../../use-local-storage";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const UploadImages = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
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
    updateMedia(file);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
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
