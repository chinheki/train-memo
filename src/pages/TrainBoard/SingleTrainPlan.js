import React,{ useEffect,useState,useMemo } from "react";
import "./TrainBoard.scss";
import { Button, InputNumber, Input, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { getTotalSeconds } from "./SingleTrain";

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const SingleTrainPlan = ({savePlan}) => {
  const [name, setName] = useState("");
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
    const [minStop, setMinStop] = useState(0);
  const [secStop, setSecStop] = useState(0);
  const [round, setRound] = useState(1);

  const disableStart=useMemo(()=>(min<=0&&sec<=0)||round<=0,[min,sec,round])
  
  const save = () => {
    savePlan({
  name,trainTime:getTotalSeconds(min,sec),relaxTime:getTotalSeconds(minStop,secStop),round
})   
 }
  return (
    <div className="train-board">
        <div className="train-row">
      运动项目：
      <Input value={min} onChange={(v) => setName(v)}></Input>
      </div>
         <div className="train-row">
      参考图片：
       <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
    </div>
    <div className="train-row">
      每组运动时间：
      <InputNumber value={min} onChange={(v) => setMin(v)}></InputNumber> m
      <InputNumber value={sec} onChange={(v) => setSec(v)}></InputNumber> s
    </div>
    <div className="train-row">
      每组休息时间：
<InputNumber value={minStop} onChange={(v) => setMinStop(v)}></InputNumber> m
      <InputNumber value={secStop} onChange={(v) => setSecStop(v)}></InputNumber> s
    </div>
    <div className="train-row">
      共 <InputNumber value={round} onChange={(v) => setRound(v)}></InputNumber> 组
    </div>
    <div className="train-row">
      <Button onClick={savePlan} disabled={disableStart}>保存</Button>
    </div>
    </div>
  );
};
export default SingleTrainPlan;
