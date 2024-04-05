import React from "react";
import "./WeeklyTrain.scss";
import diagram from "../../../public/assets/images/muscle_diagram.png";
import Dot from "./components/Dot";
import { muscleMap } from "./components/Dot";
const WeeklyTrain = () => {
  return (
    <div className="train-board" >
    <div className="status-board" >
      <div className="dots" style={{ "background-image": `url(${diagram})` }}>
        <Dot color="#FF4500" top={200} left={130} id={"Deltoid"} />
        <Dot color="#FFD700" top={240} left={130} id={"Biceps" }/>
        <Dot color="#6B8E23" top={285} left={120} id={"Brachioradialis" }/>
        <Dot color="#90EE90" top={285} left={184} id={"Abdominals" }/>
      </div>
      </div>
    </div>
  );
};
export default WeeklyTrain;
