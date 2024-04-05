import React, { useEffect, useState, useMemo, useContext, } from "react";
import "./TrainBoard.scss";
import start from "../../../public/assets/sounds/start.mp3";
import stop from "../../../public/assets/sounds/stop.mp3";
import { Button, InputNumber } from "antd";
import SingleTrain from "./SingleTrain";
import { TrainContext } from "../../App";
import TrainInPlan from "./TrainInPlan";
import { playRelaxSound } from "../../utils";
const TrainBoard = () => {
  const data = useContext(TrainContext);
  const [sport, setSport] = useState(null);
  const [index, setIndex] = useState(0);
  const [timer, setTimer] = useState(false);
  const [relax, setRelax] = useState(false);
  const [time, setTime] = useState(0);
  const relaxTime = 30;
  useEffect(() => {
    if (data.trainList.length) {
      if (index < data.trainList.length) {
        setSport(data.trainList[index]);
        setRelax(true);
      } else {
        // finish all train
      }
    }
  }, [index, data.trainList]);
  useEffect(() => {
    let intervalId;

    if (relax) {
      let remainingTime = relaxTime;
      intervalId = setInterval(() => {
        setTime(remainingTime);
        if (remainingTime === 0) {
            clearInterval(intervalId);
          setRelax(false);
          setTimer(true);
        } else {
          remainingTime--;
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [relax]);
  const no = useMemo(() => {
    return `${index + 1}/${data.trainList.length}`;
  }, [index, data.trainList]);

  const finish =useCallback(() => {
    setTimer(false);
    setRelax(true);
    setIndex((prev) => prev + 1);
  },[]);
  return (
    <div className="train-board">
      {!sport && <SingleTrain />}
      {!!sport && (
        <>
          <TrainInPlan sport={sport} play={timer} finish={finish} no={no} />
          {relax && (
            <div className="train-row">
              <div className="time">{getTimerStringBySeconds(time)}</div>
            </div>
          )}
          <div className="train-row">
            {!timer && (
              <Button
                onClick={() => setTimer(true)}
                disabled={!data?.trainList?.length}
              >
                Start
              </Button>
            )}
            {timer && <Button onClick={() => setTimer(false)}>Stop</Button>}
          </div>
        </>
      )}
    </div>
  );
};
export default TrainBoard;
