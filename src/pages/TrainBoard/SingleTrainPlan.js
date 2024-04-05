import React, { useEffect, useState, useMemo, useCallback,useContext } from "react";
import "./TrainBoard.scss";
import { Button, InputNumber, Input, Upload } from "antd";
import UploadImages from "./UploadImages";
import PartSelect from "./PartSelect";
import { getMinAndSec, getTotalSeconds } from "../../utils";
import { uploadImage } from "../../use-image-server";
import { DataContext } from "../../App";

const timePattern = [
  ["自定义"],
  ["反复动作", 1, 0, 0, 30, 3],
  ["拉伸", 0, 20, 0, 10, 3],
  ["保持姿势", 0, 30, 0, 30, 3],
  ["泡沫轴", 1, 0, 0, 10, 1],
];
const SingleTrainPlan = ({ savePlan, sport }) => {
  const [name, setName] = useState("");
  const [dec, setDec] = useState("");
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [minStop, setMinStop] = useState(0);
  const [secStop, setSecStop] = useState(0);
  const [round, setRound] = useState(1);
  const [type, setType] = useState([]);
  const [pattern, setPattern] = useState(0);
  const [fileList, setFileList] = useState([]);
  const value= useContext(DataContext)
  useEffect(() => {
    if (sport) {
      setName(sport.name);
      setDec(sport.dec);
      setMin(getMinAndSec(sport?.trainTime).minutes);
      setSec(getMinAndSec(sport?.trainTime).seconds);
      setMinStop(getMinAndSec(sport?.relaxTime).minutes);
      setSecStop(getMinAndSec(sport?.relaxTime).seconds);
      setRound(sport.round);
      setFileList(sport.imgList);
      setType(sport.type ?? []);
      console.log(sport.imgList)
    }
  }, [sport]);

  const disableStart = useMemo(
    () => (min <= 0 && sec <= 0) || round <= 0 || !name.length,
    [min, sec, round,name]
  );
  const onPatternChange = useCallback(() => {
    if (pattern === timePattern.length - 1) {
      setPattern(0);
    } else {
      setPattern(pattern + 1);
      setMin(timePattern[pattern + 1][1]);
      setSec(timePattern[pattern + 1][2]);
      setMinStop(timePattern[pattern + 1][3]);
      setSecStop(timePattern[pattern + 1][4]);
      setRound(timePattern[pattern + 1][5]);
    }
  }, [pattern]);
  const save = useCallback(async () => {
    const imgList = await uploadImage(fileList,value?.token);

    savePlan({
      ...sport,
      name,
      dec,
      trainTime: getTotalSeconds(min, sec),
      relaxTime: getTotalSeconds(minStop, secStop),
      round,
      type,
      imgList
    });
  }, [name, dec, min, sec, minStop, secStop, round, sport, type,fileList]);
  const onChangeName = (v) => {
    setName(v.target.value);
  };
  const onChangeDec = (v) => {
    setDec(v.target.value);
  };
  const onChangetime = (v, setState) => {
    setState(v);
    setPattern(0);
  };
  return (
    <>
      <div className="train-row">单次训练</div>
      <div className="train-row">
        运动项目：
        <Input onChange={onChangeName} value={name}></Input>
      </div>
      <div className="train-row">
        动作详解：
        <Input value={dec} rows={2} max={10} onChange={onChangeDec}></Input>
      </div>
      <div className="train-row no-gap">
        <PartSelect type={type} setType={setType} />
      </div>
      <div className="train-row">
        参考图片：
        <UploadImages fileList={fileList} setFileList={setFileList} />
      </div>
      <div className="train-row">
        <Button onClick={onPatternChange}>
          运动时间模式：
          {timePattern[pattern][0]}
        </Button>
      </div>
      <div className="train-row">
        每组运动时间：
        <InputNumber
          value={min}
          onChange={(v) => onChangetime(v, setMin)}
        ></InputNumber>
        m
        <InputNumber
          value={sec}
          onChange={(v) => onChangetime(v, setSec)}
        ></InputNumber>
        s
      </div>
      <div className="train-row">
        每组休息时间：
        <InputNumber
          value={minStop}
          onChange={(v) => onChangetime(v, setMinStop)}
        ></InputNumber>
        m
        <InputNumber
          value={secStop}
          onChange={(v) => onChangetime(v, setSecStop)}
        ></InputNumber>
        s
      </div>
      <div className="train-row">
        共
        <InputNumber value={round} onChange={(v) => setRound(v)}></InputNumber>
        组
      </div>
      <div className="train-row">
        <Button onClick={save} disabled={disableStart}>
          保存
        </Button>
        <Button onClick={() => savePlan()}>返回</Button>
      </div>
    </>
  );
};
export default SingleTrainPlan;
