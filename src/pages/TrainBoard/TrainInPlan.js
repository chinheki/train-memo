import React,{ useEffect,useState,useMemo } from "react";
import "./TrainBoard.scss";
import start from "../../../public/assets/sounds/start.mp3";
import stop from "../../../public/assets/sounds/stop.mp3";
import { Button, InputNumber } from "antd";
import { getMinAndSec } from "./SingleTrainPlan";
import { getTimerStringBySeconds } from "./SingleTrain";
const TrainInPlan = ({sport,finish,play,no}) => {
  const [min, setMin] = useState(getMinAndSec(sport.trainTime).minutes);
  const [sec, setSec] = useState(getMinAndSec(sport.trainTime).seconds);
    const [minStop, setMinStop] = useState(getMinAndSec(sport.relaxTime).minutes);
  const [secStop, setSecStop] = useState(getMinAndSec(sport.relaxTime).seconds);
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(false);
  const [round, setRound] = useState(sport.round || 1);
  useEffect(() => {
    if (play) {
      setTimer(true)
    } else {
      setTimer(false)
    }
  },[play])
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
        if (timer) {
          setTime(remainingTime);
          if (remainingTime === 0) {
            if (loopCount < round * 2 - 2) {
              loopCount++;
              if (loopCount % 2 === 1) {
                if (relaxTime > 0) {
                  remainingTime = relaxTime; // Start new timer
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
        }

      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timer, min, sec,round,minStop,secStop]);

  function playRelaxSound() {
    // Code to play the sound
    // You can use the HTML5 Audio element or any other library to play the sound
    const audio = new Audio(stop);
audio.play();
  }
    function playStartSound() {
    // Code to play the sound
    // You can use the HTML5 Audio element or any other library to play the sound
    const audio = new Audio(start);
audio.play();
  }
  return (
    <>
       <div className="train-row">
     {no} {sport.name||""}
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
      <div className="time">{getTimerStringBySeconds(time)}</div>
      </div>
    </>
  );
};
export default TrainInPlan;



export function getTotalSeconds(min, sec) {
  return min * 60 + sec;
}
