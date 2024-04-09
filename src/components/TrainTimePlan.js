import React, { useEffect, useState, useCallback,useContext,useMemo  } from "react";

import { Button, InputNumber,Input } from "antd";
import {
  getMinAndSec,
  getTimeList,
  getTotalSeconds,
} from "../utils";
import TrainTimer from "./TrainTimer";
import { useNavigate } from "react-router";
import { DataContext, UpdateDataContext } from "../App";
import PartSelect from "./PartSelect";
import UploadImages from "./UploadImages";
import { uploadImage } from "../store/use-image-server";
const timePattern = [
  ["自定义"],
  ["暂无时间（回数模式）"],
  ["反复动作", 1, 0, 0, 30, 3],
  ["左右轮流反复动作", 1, 0, 0, 30, 6],
  ["拉伸", 0, 20, 0, 10, 3],
  ["保持姿势", 0, 30, 0, 30, 3],
  ["泡沫轴", 1, 0, 0, 10, 1]
];
const TrainTimePlan = ({ isSingleTrain,  afterSavePlan, sport }) => {
    const [name, setName] = useState("");
  const [dec, setDec] = useState("");
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [minStop, setMinStop] = useState(0);
  const [secStop, setSecStop] = useState(0);
  const [round, setRound] = useState(1);
    const [type, setType] = useState([]);
  const [pattern, setPattern] = useState(0);
  const [count, setCount] = useState(10);
  const [timeInput, setTimeInput] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [canSave, setSave] = useState(!isSingleTrain);
  const { update, insert, remove } = useContext(UpdateDataContext);
  const value= useContext(DataContext)
  const navigate = useNavigate();
    const savePlan = (plan) => {
    if (!!plan) {
      if (plan.id) {
        update("sports", plan);
      } else {
        insert("sports", plan);
      }
      isSingleTrain && navigate("/sports");
      afterSavePlan()
      }
  };
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
      setType([]);
      setCount(sport.count ?? 10);
    }
  }, [sport]);
    const onPatternChange = useCallback(() => {
    if (pattern === timePattern.length - 1) {
      setTimeInput(true);
      setPattern(0);
    } else {
      setPattern(pattern + 1);
      if (pattern === 0) {
        setTimeInput(false);
      } else {
        setTimeInput(true);

        setMin(timePattern[pattern + 1][1]);
        setSec(timePattern[pattern + 1][2]);
        setMinStop(timePattern[pattern + 1][3]);
        setSecStop(timePattern[pattern + 1][4]);
        setRound(timePattern[pattern + 1][5]);
      }
    }
  }, [pattern]);
   const save = useCallback(async () => {
    const imgList = await uploadImage(fileList, value?.token);

    savePlan({
      ...sport,
      name,
      dec,
      trainTime: getTotalSeconds(min, sec),
      relaxTime: getTotalSeconds(minStop, secStop),
      round,
      type,
      imgList,
      count
    });
  }, [name, dec, min, sec, minStop, secStop, round, sport, type, fileList]);
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
    const disableStart = useMemo(
    () => (min <= 0 && sec <= 0) || round <= 0,
    [min, sec, round]
  );
  const timeList = useMemo(() => {
    return getTimeList([{name:"自主训练", trainTime: getTotalSeconds(min, sec), relaxTime: getTotalSeconds(minStop, secStop), round }],0);
},[min,sec,minStop,secStop,round])
  return (
    <div className="train-board center scroll">
      {(isSingleTrain&&!canSave) && (
        <>
          <div className="train-row title">立刻开始单次训练</div>
          <TrainTimer
            timeList={timeList}
            prex=""
          />
        </>
      )}
      {canSave &&
        <>
        <div className="train-row  space-between">
        项目名*：
        <Input onChange={onChangeName} value={name} style={{ width:"fit-content"}}></Input>
      </div>
      <div className="train-row  space-between">
        动作补充说明： <Input.TextArea rows={3} value={dec} max={10} style={{ width:"fit-content"}} onChange={onChangeDec}/>
      </div>
      <div className="train-row no-gap">
        <PartSelect type={type} setType={setType} />
      </div>
        <UploadImages fileList={fileList} setFileList={setFileList} />
      <div className="train-row ">
        <Button onClick={onPatternChange}>
          训练模式：
          {timePattern[pattern][0]}
        </Button>
      </div>

      {!timeInput && (
        <>
          <div className="train-row  space-between">
            每组
            <InputNumber
              value={count}
              step={5}
              onChange={(v) => setCount(v)}
            ></InputNumber>
            回
          </div>
          <div className="train-row small-text">
          * 本模式下，每次训练时可选择记录动作时间作为固定训练时长，也可手动结束训练
          </div>
        </>
      )}
        </>}
      {timeInput && (
      <div className="train-row space-between">
        每组时长
        <div>
          <InputNumber
            value={min}
            onChange={(v) => onChangetime(v, setMin)}
          ></InputNumber>
          分
          <InputNumber
            value={sec}
            step={5}
            onChange={(v) => onChangetime(v, setSec)}
          ></InputNumber>
          秒
        </div>
      </div>
      )}
      <div className="train-row space-between">
        间息
        <div>
          <InputNumber
            value={minStop}
            onChange={(v) => onChangetime(v, setMinStop)}
          ></InputNumber>
          分
          <InputNumber
            value={secStop}
            step={5}
            onChange={(v) => onChangetime(v, setSecStop)}
          ></InputNumber>
          秒
        </div>
      </div>
      <div className="train-row space-between">
        重复
        <div>
          <InputNumber
            value={round}
            onChange={(v) => setRound(v)}
          ></InputNumber>
          组
        </div>
      </div>

      {canSave &&
        <div className="train-row center">
          <Button onClick={save} disabled={disableStart}>
            保存
          </Button>
          {!isSingleTrain&&<Button onClick={() => afterSavePlan()}>返回</Button>}
          {isSingleTrain&&<Button onClick={() => setSave(false)}>返回</Button>}
        </div>}
            {!canSave &&
        <div className="train-row center">
          <Button onClick={()=>setSave(true)}>
            保存为训练项目
          </Button>
        </div>}
    </div>
  );
};
export default TrainTimePlan;
