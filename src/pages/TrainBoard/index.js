import React,{ useEffect,useState,useMemo } from "react";
import "./TrainBoard.scss";
import start from "../../../public/assets/sounds/start.mp3";
import stop from "../../../public/assets/sounds/stop.mp3";
import { Button, InputNumber } from "antd";
import SingleTrain from "./SingleTrain";
const TrainBoard = () => {
  
  return (
    <SingleTrain />
  );
};
export default TrainBoard;

/**
 * get string in format HH:mm:ss
 * @param {number} hour
 * @param {number} minute
 */
function getTimerString(hour, minute) {
  const padZero = (num) => (num < 10 ? "0" + num : num);
  const seconds = 0;
  const formattedTime = `${padZero(hour)}:${padZero(minute)}:${padZero(
    seconds
  )}`;
  return formattedTime;
}
function getTimerStringBySeconds(seconds) {
  const padZero = (num) => (num < 10 ? "0" + num : num);
  const hour = Math.floor(seconds / 3600);
  const minute = Math.floor((seconds % 3600) / 60);
  const second = seconds % 60;
  const formattedTime = `${padZero(hour)}:${padZero(minute)}:${padZero(second)}`;
  return formattedTime;
}
function getTotalSeconds(min, sec) {
  return min * 60 + sec;
}