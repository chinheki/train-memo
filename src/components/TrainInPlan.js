import React, { useEffect, useState, useMemo } from "react";
import { Button, InputNumber } from "antd";
import {
  getTimeList,
  getTimerStringBySeconds,
  getTotalSeconds,
  playRelaxSound,
  playStartSound
} from "../utils";
import Images from "./Images";
import TrainTimer from "./TrainTimer";

const TrainInPlan = ({ sports }) => {
  const [sport, setSport] = useState((sports||[])[0]);
  const [index, setIndex] = useState(0);
    const no = useMemo(() => {
    return `${index + 1}/${sports.length}`;
  }, [index, sports]);

  
    const timeList = useMemo(() => {
  return getTimeList(sports||[]);
},[sports])
  return (
    <div className="train-board" style={{height:"100%"}}>
      <TrainTimer timeList={timeList} />
    <div className="train-show">
        <Images fileList={sport.imgList ?? []} dec={ sport.dec} />
    </div>
    </div>
  );
};
export default TrainInPlan;
