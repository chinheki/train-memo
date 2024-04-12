import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  useMemo
} from "react";
import "./TrainForm.scss";
import { Button, InputNumber, Input, Checkbox, message, Modal } from "antd";
import {
  getMinAndSec,
  getTimeList,
  getTotalSeconds,
  getTypesFromName
} from "../utils";
import TimerWithAction from "./TimerWithAction";
import { useNavigate } from "react-router";
import { DataContext, UpdateDataContext } from "../App";
import PartSelect from "./PartSelect";
import UploadImages from "./UploadImages";
import { uploadImage } from "../store/use-image-server";
const timePattern = [
  ["自定义"],
  ["反复动作", 1, 0, 0, 30, 3],
  ["保持姿势", 0, 30, 0, 30, 3],
  ["拉伸", 0, 20, 0, 10, 3],
  ["暂无时间（回数模式）"]
];
const TrainForm = ({ isSingleTrain, afterSavePlan, sport }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [name, setName] = useState("");
  const [dec, setDec] = useState("");
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [minStop, setMinStop] = useState(0);
  const [secStop, setSecStop] = useState(0);
  const [double, setDouble] = useState(false);
  const [round, setRound] = useState(1);
  const [type, setType] = useState([]);
  const [pattern, setPattern] = useState(0);
  const [count, setCount] = useState(10);
  const [timeInput, setTimeInput] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [canSave, setSave] = useState(!isSingleTrain);
  const { update, insert, remove } = useContext(UpdateDataContext);
  const [isModalOpen, setModal] = useState(false);
  const value = useContext(DataContext);
  const navigate = useNavigate();
  const savePlan = useCallback(
    async (plan) => {
      if (!!plan) {
        if (plan.id) {
          return await update(plan);
        } else {
          return await insert(plan);
        }
      }
    },
    [update, insert]
  );
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
      if (pattern === timePattern.length - 2) {
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
    let useType = [...type];
    if (!type.length) {
      useType = getTypesFromName(name);
    }
    setModal(true);
    const imgList = await uploadImage(fileList, value?.token);

    const result = await savePlan({
      ...sport,
      name,
      dec,
      trainTime: getTotalSeconds(min, sec),
      relaxTime: getTotalSeconds(minStop, secStop),
      round,
      type: useType,
      imgList,
      count
    });
    console.log(result);
    setModal(false);
    if (result) {
      message.info("保存成功");
      isSingleTrain && navigate("/sports");
      afterSavePlan();
    } else {
      message.error("保存失败！");
    }
  }, [
    name,
    dec,
    min,
    sec,
    minStop,
    secStop,
    round,
    sport,
    type,
    fileList,
    isSingleTrain,
    count,
    value,
    savePlan,
    afterSavePlan,
    messageApi,
    navigate
  ]);
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
  const onAddtime = (step, setState) => {
    setState((prev) => prev + step);
    setPattern(0);
  };
  const disableStart = useMemo(
    () => (min <= 0 && sec <= 0) || round <= 0,
    [min, sec, round]
  );
  const disableSave = useMemo(
    () => disableStart || !name.length,
    [name.length, disableStart]
  );
  const timeList = useMemo(() => {
    return getTimeList(
      [
        {
          name: "自主训练",
          trainTime: getTotalSeconds(min, sec),
          relaxTime: getTotalSeconds(minStop, secStop),
          round
        }
      ],
      0
    );
  }, [min, sec, minStop, secStop, round]);
  return (
    <div className="train-board center scroll">
      {isSingleTrain && !canSave && (
        <>
          <div className="train-row title">立刻开始单次训练</div>
          <TimerWithAction timeList={timeList} prex="" />
        </>
      )}
      {canSave && (
        <>
          <div className="train-row  space-between">
            项目名*：
            <Input
              onChange={onChangeName}
              value={name}
              style={{ width: "100%" }}
            ></Input>
          </div>
          <div className="train-row  space-between">
            动作补充说明：
            <Input.TextArea
              rows={3}
              value={dec}
              max={10}
              style={{ width: "100%" }}
              onChange={onChangeDec}
            />
          </div>
          <div className="train-row no-gap">
            <PartSelect type={type} setType={setType} />
          </div>
          <UploadImages fileList={fileList} setFileList={setFileList} />
          <div className="train-row  space-between">
            使用预设时间模式：
            <Button className="big-btn" onClick={onPatternChange}>
              {timePattern[pattern][0]}
            </Button>
          </div>

          {!timeInput && (
            <>
              {/*
              <div className="train-row  space-between">
                每组
                <Button
                  type="dashed"
                  size="small"
                  ghost
                  className="down-btn"
                  onClick={() => onAddtime(-1, setCount)}
                >
                  -
                </Button>
                <InputNumber
                  value={count}
                  
                  min={0}
                  step={5}
                  onChange={(v) => setCount(v)}
                ></InputNumber>
                <Button
                  type="dashed"
                  size="small"
                  ghost
                  className="up-btn"
                  onClick={() => onAddtime(1, setCount)}
                >
                  +
                </Button>
                回
              </div>
*/}
              <div className="train-row small-text">
                *
                本模式下，每次训练时可选择记录动作时间作为固定训练时长，也可手动结束训练
              </div>
            </>
          )}
        </>
      )}
      {timeInput && (
        <div className="train-row space-between">
          每组时长
          <div>
            <Button
              type="dashed"
              size="small"
              ghost
              shape="circle"
              className="down-btn"
              onClick={() => onAddtime(-1, setMin)}
            >
              -
            </Button>
            <InputNumber
              value={min}
              min={0}
              onChange={(v) => onChangetime(v, setMin)}
            ></InputNumber>
            <Button
              type="dashed"
              size="small"
              ghost
              shape="circle"
              className="up-btn"
              onClick={() => onAddtime(1, setMin)}
            >
              +
            </Button>
            分
            <Button
              type="dashed"
              size="small"
              ghost
              shape="circle"
              className="down-btn"
              onClick={() => onAddtime(-5, setSec)}
            >
              -
            </Button>
            <InputNumber
              value={sec}
              min={0}
              step={5}
              onChange={(v) => onChangetime(v, setSec)}
            ></InputNumber>
            <Button
              type="dashed"
              size="small"
              shape="circle"
              ghost
              className="up-btn"
              onClick={() => onAddtime(5, setSec)}
            >
              +
            </Button>
            秒
          </div>
        </div>
      )}
      <div className="train-row space-between">
        间息
        <div>
          <Button
            type="dashed"
            size="small"
            ghost
            shape="circle"
            className="down-btn"
            onClick={() => onAddtime(-1, setMinStop)}
          >
            -
          </Button>
          <InputNumber
            value={minStop}
            min={0}
            onChange={(v) => onChangetime(v, setMinStop)}
          ></InputNumber>
          <Button
            type="dashed"
            size="small"
            ghost
            shape="circle"
            className="up-btn"
            onClick={() => onAddtime(1, setMinStop)}
          >
            +
          </Button>
          分
          <Button
            type="dashed"
            size="small"
            ghost
            shape="circle"
            className="down-btn"
            onClick={() => onAddtime(-1, setSecStop)}
          >
            -
          </Button>
          <InputNumber
            value={secStop}
            min={0}
            step={5}
            onChange={(v) => onChangetime(v, setSecStop)}
          ></InputNumber>
          <Button
            type="dashed"
            size="small"
            ghost
            shape="circle"
            className="up-btn"
            onClick={() => onAddtime(5, setSecStop)}
          >
            +
          </Button>
          秒
        </div>
      </div>
      <div className="train-row space-between">
        <div></div>
        <div>
          <Checkbox value={double} onChange={(v) => setDouble(v)}>
            左右轮流
          </Checkbox>
          重复
          <Button
            type="dashed"
            size="small"
            ghost
            shape="circle"
            className="down-btn"
            onClick={() => setRound((prev) => prev - 1)}
          >
            -
          </Button>
          组
          <InputNumber
            value={round}
            min={0}
            onChange={(v) => setRound(v)}
          ></InputNumber>
          <Button
            type="dashed"
            size="small"
            ghost
            shape="circle"
            className="up-btn"
            onClick={() => setRound((prev) => prev + 1)}
          >
            +
          </Button>
          组
        </div>
      </div>

      {canSave && (
        <div className="train-row center">
          <Button className="big-btn" onClick={save} disabled={disableSave}>
            保存
          </Button>
          {!isSingleTrain && (
            <Button className="big-btn" onClick={() => afterSavePlan()}>
              返回
            </Button>
          )}
          {isSingleTrain && (
            <Button className="big-btn" onClick={() => setSave(false)}>
              返回
            </Button>
          )}
        </div>
      )}
      {!canSave && (
        <div className="train-row center">
          <Button className="big-btn" onClick={() => setSave(true)}>
            保存为训练项目
          </Button>
        </div>
      )}
      <Modal footer={null} title={null} open={isModalOpen} closeIcon={null}>
        正在保存...
      </Modal>
    </div>
  );
};
export default TrainForm;
