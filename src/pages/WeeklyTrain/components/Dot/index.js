import React, {useState,useCallback } from "react";
import { useTranslation } from "react-i18next";
import "./Dot.scss";
export const muscleMap = {
  Abdominals:["abdominals"],
  Deltoid:["deltoid"],
  Biceps:["biceps"],
  Brachioradialis:["brachioradialis"],
}
const Dot = ({ color, top, left, id }) => {
  const [done, setDone] = useState(false);
  const [index, setIndex] = useState(0);
  const {t}=useTranslation()
  const onClick = () => {
    setDone(true)
  }
  const changeLan = useCallback(() => {
    if (index + 1 === muscleMap[id].length) {
      
      setIndex(0)
    } else {
      
      setIndex(index+1)
    }
  },[id,index])
  return (
    <div className={`dot${done?" done":" not-done"}`} style={{"--color-var":color,left,top}} onClick={changeLan}>
      <div className="dot">{done ? t("dot.done") : ""}</div>
      {muscleMap[id][index]}
    </div>
  );
};
export default Dot;
