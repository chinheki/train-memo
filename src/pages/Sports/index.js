import React,{ useEffect,useState,useMemo,useContext } from "react";
import "./TrainBoard.scss";
import { Button, InputNumber } from "antd";
import { DataContext } from "../../App";
const SportsList = () => {
  const data=useContext(DataContext)
const [newRow,setNewRow]=useState(false)
  return (

    <div className="train-board">
      {data?.sports||[].map(s=>
        <div className="train-row">

</div>
)}
    {!newRow&&<Button onClick={()=>setNewRow(true) } >+</Button>}
    {newRow&&<div ></div>}
    </div>
  );
};
export default SportsList;
