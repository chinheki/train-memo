import React, {useState } from "react";
import { useTranslation } from "react-i18next";
import "./Dot.scss";
export const muscleMap = {
  Abdominals:"abdominals",
  Deltoid:"deltoid",
  Biceps:"biceps",
  Brachioradialis:"brachioradialis",
}
const Dot = ({ color, top, left, id }) => {
  const [done, setDone] = useState(false);
  const {t}=useTranslation()
  const onClick = () => {
    setDone(true)
  }
  return (
    <div className={`dot${done?" done":" not-done"}`} style={{"--color-var":color,left,top}} onClick={onClick}>
      <div className="dot">{done?t("dot.done"):"" }</div>
    </div>
  );
};
export default Dot;
