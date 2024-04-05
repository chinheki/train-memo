import React,{ useEffect,useState,useMemo } from "react";
import "./TrainBoard.scss";

import { Button, InputNumber } from "antd";
import { playRelaxSound, playStartSound } from "../../utils";
const SingleTrain = ({sport}) => {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
    const [minStop, setMinStop] = useState(0);
  const [secStop, setSecStop] = useState(0);
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(false);
  const [round, setRound] = useState(1);
  useEffect(() => {
    let intervalId;
    let loopCount = 0;
    
    if (timer) {
      const trainTime = getTotalSeconds(min, sec); // Start the first timer again
      const relaxTime = getTotalSeconds(minStop, secStop); // Start new timer
      let remainingTime = trainTime; 
      playStartSound();
      intervalId = setInterval(() => {
        console.log(remainingTime)
        setTime(remainingTime);
        if (remainingTime === 0) {
          if (loopCount < round*2-2 ) {
            loopCount++;
            if (loopCount % 2 === 1) {
              if (relaxTime > 0) {
                remainingTime = relaxTime; // Start new timer
                console.log('finish one round')
                playRelaxSound();
              } else {
                remainingTime = 0; // Start new timer
              }
            } else {
              remainingTime = trainTime; // Start the first timer again
              playStartSound();
            }
          } else {
              playRelaxSound();
            
      clearInterval(intervalId);
      setTimer(false)
          }
        } else {
          
          remainingTime--;
        }

      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timer, min, sec,round,minStop,secStop]);
  const stopTrain = () => {
  setTimer(false)
    setTime(0);
  
}
  const disableStart=useMemo(()=>(min<=0&&sec<=0)||round<=0,[min,sec,round])

  return (
    <>
       <div className="train-row">
        立刻开始单次训练
      </div>
      <div className="train-row">
        ---------------
    </div>
    <div className="train-row">
      每组运动时间：
      <InputNumber value={min} onChange={(v) => setMin(v)}></InputNumber> m
      <InputNumber value={sec} onChange={(v) => setSec(v)}></InputNumber> s
    </div>
    <div className="train-row">
      每组休息时间：
<InputNumber value={minStop} onChange={(v) => setMinStop(v)}></InputNumber> m
      <InputNumber value={secStop} onChange={(v) => setSecStop(v)}></InputNumber> s
    </div>
    <div className="train-row">
      共 <InputNumber value={round} onChange={(v) => setRound(v)}></InputNumber> 组
    </div>
    <div className="train-row">
      {!timer&&<Button onClick={() => setTimer(true)} disabled={disableStart}>Start</Button>}
      {timer&&<Button onClick={stopTrain}>Stop</Button>}
    </div>
    <div className="train-row">
      <div className="time">{getTimerStringBySeconds(time)}</div>
    </div>
    </>
  );
};
export default SingleTrain;


export function getTimerStringBySeconds(seconds) {
  const padZero = (num) => (num < 10 ? "0" + num : num);
  const minute =Math.floor(seconds / 60);
  const second = seconds % 60;
  const formattedTime = `${padZero(minute)}:${padZero(second)}`;
  return formattedTime;
}
export function getTotalSeconds(min, sec) {
  return min * 60 + sec;
}