import React, {
  useEffect,
  useState,
  useMemo,
  useContext,
  useCallback
} from "react";
import "./TrainBoard.scss";
import { Button, InputNumber } from "antd";
import SingleTrain from "./SingleTrain";
import { TrainContext } from "../../App";
import TrainInPlan from "./TrainInPlan";
import { getTimerStringBySeconds, playRelaxSound } from "../../utils";
const relaxTime = 5;
const TrainBoard = () => {
  const data = useContext(TrainContext);
  const [sport, setSport] = useState(null);
  const [index, setIndex] = useState(0);
  const [timer, setTimer] = useState(false);
  const [relax, setRelax] = useState(false);
  const [time, setTime] = useState(0);
  const [relaxIntervalId, setRelaxIntervalId] = useState(null);

  useEffect(() => {
    if (data.trainList.length) {
      setSport(data.trainList[0]);
    }
  }, [data.trainList]);
  const no = useMemo(() => {
    return `${index + 1}/${data.trainList.length}`;
  }, [index, data.trainList]);

  const finish = useCallback(() => {
    if (data.trainList.length) {
      if (index < data.trainList.length - 1) {
        setIndex(index + 1);
        setTimer(false);
        let remainingTime = relaxTime;
        setTime(remainingTime);
        setRelax(true);
        setSport(data.trainList[index + 1]);
        let intervalId;

        intervalId = setInterval(() => {
          setTime(remainingTime);
          console.log(remainingTime);
          console.log(remainingTime);
          if (remainingTime === 0) {
            clearInterval(intervalId);
            setRelaxIntervalId(null);
            setRelax(false);
            setTimer(true);
          } else {
            remainingTime--;
          }
        }, 1000);
        setRelaxIntervalId(intervalId);
      } else {
        // finish all train
      }
    }
  }, [index, data.trainList, relax]);
  const stop = useCallback(() => {
    if (relax) {
      clearInterval(relaxIntervalId);
      setRelaxIntervalId(null);
      setRelax(false);
      setTimer(true);
    } else {
      setTimer(false);
    }
  }, [timer, relax, relaxIntervalId]);
  const start = useCallback(() => {
    if (index < data.trainList.length) {
      setTimer(true);
    }
  }, [index, data.trainList]);
  return (
    <div className="train-board">
      {!sport && <SingleTrain />}
      {relax && (
        <>
          <div className="train-row">休息时间，抓紧补水</div>
          <div className="train-row">
            <div className="time">{getTimerStringBySeconds(time)}</div>
          </div>
        </>
      )}
      {!!sport && !relax && (
        <>
          <TrainInPlan sport={sport} play={timer} finish={finish} no={no} />
        </>
      )}
      <div className="train-row">
        {!!sport && !timer && !relax && (
          <Button onClick={start} disabled={!data?.trainList?.length}>
            Start
          </Button>
        )}
        {!!sport && (timer || relax) && (
          <Button onClick={stop}>{relax ? "Skip" : "Stop"}</Button>
        )}
      </div>
    </div>
  );
};
export default TrainBoard;
