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
