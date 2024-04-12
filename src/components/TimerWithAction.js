import React, { useCallback, useState, useMemo, useEffect } from "react";

import { Button, InputNumber } from "antd";
import {
  getTimerStringBySeconds,
  getTotalSeconds,
  playRelaxSound,
  playStartSound
} from "../utils";
import Timer from "./Timer";
import Images from "./Images";
const TimerWithAction = ({ timeList}) => {
  const [time, setTime] = useState(timeList[0]?.time ?? 0);
  const [timer, setTimer] = useState(false);
  const [finish, setFinish] = useState(true);
  const [turn, setTurn] = useState(0);
  const onStart = () => {
    setTimer(true);
    playStartSound();
    setFinish(false);
  };
  useEffect(() => {
    if (!!timeList.length && finish) {
      setTime(timeList[0].time);
    }
  }, [timeList, finish]);
  const onEnd = useCallback(() => {
    setTimeout(() => {
      setTimer(false);
      console.log("onEnd", turn, timeList.length);
      if (turn < timeList.length - 1) {
        setTurn(turn + 1);
      console.log(timeList[turn + 1].time);
        setTime(timeList[turn + 1].time);
        setTimeout(() => {
          if (timeList[turn + 1].type === "train") {
            playStartSound();
          } else {
            playRelaxSound();
          }
          setTimer(true);
        }, 1000);
      } else {
        // finish
        window.alert("finsh");
        setTimer(false);
        setFinish(true);
      }
    }, 1000);
  }, [turn, timeList]);

  const disableStart = useMemo(() => !timeList.length, [timeList]);

  const relax = useMemo(() => {
    return timeList[turn] && timeList[turn]?.type !== "train";
  }, [timeList, turn]);

  return (
    <>
      <Timer
        prex={timeList[turn]?.prex??"" }
        during={time}
        play={timer}
        onEnd={onEnd}
        canSkip={relax}
      />
      <div className="train-row">
        {!timer && finish && (
          <Button onClick={onStart} disabled={disableStart}>
            Start
          </Button>
        )}
      </div>
        <Images fileList={timeList[turn].imgList ?? []} dec={timeList[turn].dec} />
    </>
  );
};
export default TimerWithAction;
