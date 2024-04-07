import React, { useEffect, useState, useMemo, useContext } from "react";
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
import { TrainContext } from "../App";

const TrainInPlan = ({ sports }) => {
  const plan = useContext(TrainContext);

  const timeList = useMemo(() => {
    return getTimeList(sports || [], plan?.gapTime ?? 0);
  }, [sports, plan?.gapTime]);
  return (
    <div className="train-board" style={{ height: "100%" }}>
      <TrainTimer timeList={timeList} />
    </div>
  );
};
export default TrainInPlan;
