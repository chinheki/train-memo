import React, { useState, useCallback } from "react";
import "./Dot.scss";

const Dot = ({lan, value:{en, ch, jp,left,top} }) => {
 

  return (
    <div
      className={`dot`}
      style={{left, top}}
    >
      {lan === 0 ? en : lan === 1 ? ch : jp}
    </div>
  );
};
export default Dot;
