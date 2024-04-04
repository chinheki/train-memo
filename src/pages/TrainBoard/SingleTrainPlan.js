import React, { useEffect, useState, useMemo,useCallback } from "react";
import "./TrainBoard.scss";
import { Button, InputNumber, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getTotalSeconds } from "./SingleTrain";
import axios from "axios";
import UploadImages from "./UploadImages";
import PartSelect from "./PartSelect";
  

const SingleTrainPlan = ({ savePlan,sport }) => {
  const [name, setName] = useState("");
  const [dec, setDec] = useState("");
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [minStop, setMinStop] = useState(0);
  const [secStop, setSecStop] = useState(0);
  const [round, setRound] = useState(1);
  const [type, setType] = useState([]);
  useEffect(() => {
    if (sport) {
    setName(sport.name)
    setDec(sport.dec)
    setMin(getMinAndSec(sport?.trainTime).minutes)
    setSec(getMinAndSec(sport?.trainTime).seconds)
    setMinStop(getMinAndSec(sport?.relaxTime).minutes)
    setSecStop(getMinAndSec(sport?.relaxTime).seconds)
      setRound(sport.round)
      console.log(sport.type)
    setType(sport.type??[])
  }
},[sport])

  const disableStart = useMemo(
    () => (min <= 0 && sec <= 0) || round <= 0,
    [min, sec, round]
  );

  const save = useCallback(() => {
    savePlan({
      ...sport,
      name,
      dec,
      trainTime:getTotalSeconds(min, sec),
      relaxTime:getTotalSeconds(minStop, secStop),
      round,
      type
    });
  },[name,dec,min,sec,minStop,secStop,round,sport,type]);
  const onChangeName = (v) => {
    console.log(v)
    setName(v.target.value)
  }
   const onChangeDec = (v) => {
    setDec(v.target.value)
  }
  return (
    <div className="train-board">
      <div className="train-row">
        运动项目：
        <Input onChange={onChangeName} value={name}></Input>
      </div>
      <div className="train-row">
        动作详解：
        <Input
          value={dec}
          rows={2}
          max={10}
          onChange={onChangeDec}
        ></Input>
      </div>
      <div className="train-row no-gap">
      <PartSelect type={type} setType={setType} />
      </div>
      <div className="train-row">
        参考图片：
        <UploadImages />
      </div>
      <div className="train-row">
        每组运动时间：
        <InputNumber value={min} onChange={(v) => setMin(v)}></InputNumber> m
        <InputNumber value={sec} onChange={(v) => setSec(v)}></InputNumber> s
      </div>
      <div className="train-row">
        每组休息时间：
        <InputNumber
          value={minStop}
          onChange={(v) => setMinStop(v)}
        ></InputNumber>{" "}
        m
        <InputNumber
          value={secStop}
          onChange={(v) => setSecStop(v)}
        ></InputNumber>{" "}
        s
      </div>
      <div className="train-row">
        共{" "}
        <InputNumber value={round} onChange={(v) => setRound(v)}></InputNumber>{" "}
        组
      </div>
      <div className="train-row">
        <Button onClick={save} disabled={disableStart}>
          保存
        </Button>
      </div>
    </div>
  );
};
export default SingleTrainPlan;

  const getMinAndSec = (totalSeconds) => {
    if (typeof totalSeconds !== 'number') {
      return { minutes: 0, seconds: 0 };
    }
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return { minutes, seconds };
  }
