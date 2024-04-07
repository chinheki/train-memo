import React, { useEffect, useState, useCallback, useRef } from "react";
import { Button, InputNumber } from "antd";
import { getTimerStringBySeconds } from "../utils";

const Timer = ({ during, play, onEnd, canSkip, prex }) => {
  const [time, setTime] = useState(during);
  const [stop, setStop] = useState(false);
  const currentTimer = useRef();

  useEffect(() => {
    console.log("setTime", during);
    if (!play&&during > 0) {
      setTime(during);
    }
  }, [during,play]);
  useEffect(() => {
    if (time <= 0 && !stop && play) {
      setStop(false);
      clearInterval(currentTimer.current);
      currentTimer.current = null;
      onEnd();
    }

  }, [time, stop, play]);
    useEffect(() => {

    if (!play) {
      clearInterval(currentTimer.current);
    }
  }, [ play]);
  useEffect(() => {
    console.log("time", time, stop, play);
 
    if (!stop && time > 0 && play && !currentTimer.current) {
      startTimer();
    }

  }, [time, stop, play, currentTimer.current]);

  const startTimer = () => {
    setStop(false);
    currentTimer.current = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
  };
  const stopTimer = () => {
    clearInterval(currentTimer.current);
    currentTimer.current = null;
    setStop(true);
  };
  const resetTimer = () => {
    clearInterval(currentTimer.current);
    currentTimer.current = null;
    setTime(0);
  };

  return (
    <>
      <div className="train-row">
        {prex}
        <div className="time">{getTimerStringBySeconds(time)}</div>
      </div>
     
      {!stop && canSkip && (
        <div className="train-row small-text">
          点击任意地方跳过休息时间
         {play&& <Button onClick={resetTimer} className="cover-all-btn"></Button>}
        </div>
      )}
      {!canSkip && !stop && (
        <div className="train-row small-text">
          点击任意地方暂停倒计时
          {play&&<Button onClick={stopTimer} className="cover-all-btn"></Button>}
        </div>
      )}
      {stop && (
        <div className="train-row">
          <Button
            onClick={startTimer}
            className="cover-all-btn cover-all-btn-mask"
          >
            点击任意地方继续倒计时
          </Button>
        </div>
      )}
    </>
  );
};
export default Timer;
