import React, { useEffect, useState, useMemo } from "react";
import { Button, InputNumber } from "antd";
import {
  getMinAndSec,
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
    <div className="train-board">
      <TrainTimer timeList={timeList} />
      {!!sport.imgList?.length && <Images fileList={sport.imgList} />}
      {!!sport.dec?.length && <div className="train-row">{sport.dec}</div>}
    </div>
  );
};
export default TrainInPlan;
