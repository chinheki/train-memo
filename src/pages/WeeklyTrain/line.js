import React, { useState, useCallback } from "react";
import "./WeeklyTrain.scss";

const Line = ({ value}) => {
  const [top,left,rotation,lineWidth]=value??[0,0,0,0]
  // const [left, setLeft] = useState(constLeft??100);
  // const [top, setTop] = useState(constTop??100);
  // const [rotation, setRotation] = useState(constR??0);
  // const [showInput, setShowInput] = useState(false);
  // const [lineWidth, setLineWidth] = useState(constLenght??150);
  // const onMouseDown = useCallback((e) => {
  //   console.log(e)
  //     if (e.ctrlKey) {
  //       const startX = e.clientX;
  //       const startY = e.clientY;
  //       const startRotation = rotation;

  //       const onMouseMove = (e) => {
  //         const offsetX = e.clientX - startX;
  //         const offsetY = e.clientY - startY;
  //         const angle = Math.atan2(offsetY, offsetX) * (180 / Math.PI);
  //         setRotation(startRotation + angle);
  //         onChange(id, top, left, startRotation + angle,lineWidth)
  //       };

  //       const onMouseUp = () => {
  //         document.removeEventListener("mousemove", onMouseMove);
  //         document.removeEventListener("mouseup", onMouseUp);
  //       };

  //       document.addEventListener("mousemove", onMouseMove);
  //       document.addEventListener("mouseup", onMouseUp);
  //     } else {
  //   const startX = e.clientX;
  //   const startY = e.clientY;
  //   const startLeft = left;
  //   const startTop = top;

  //   const onMouseMove = (e) => {
  //       const offsetX = e.clientX - startX;
  //       const offsetY = e.clientY - startY;
  //       setLeft(startLeft + offsetX);
  //       setTop(startTop + offsetY);
  //       onChange(id, startTop + offsetY, startLeft + offsetX, rotation,lineWidth)
  //     };

  //     const onMouseUp = () => {
  //       document.removeEventListener("mousemove", onMouseMove);
  //       document.removeEventListener("mouseup", onMouseUp);
  //       const relativeLeft = left - startLeft;
  //       const relativeTop = top - startTop;
  //     };

  //     document.addEventListener("mousemove", onMouseMove);
  //     document.addEventListener("mouseup", onMouseUp);
  //   }
  // }, [left, top,rotation,lineWidth]);

  // const onContextMenu = (e) => {
  //   e.preventDefault();
  //   setShowInput(true);
  // };

  // const onInputChange =useCallback((e) => {
  //   setLineWidth(e.target.value);
  //   onChange(id, top, left, rotation,parseInt(e.target.value))
  // },[ top, left, rotation]);

  // const onInputBlur = () => {
  //   setShowInput(false);
  // };

  return (
    <div
      className='line'
      style={{ left, top, transform: `rotate(${rotation}deg)`, width: `${lineWidth}px` }}
      // onMouseDown={onMouseDown}
      // onContextMenu={onContextMenu}
    >
      {/* {showInput && (
        <input
          type='number'
          value={lineWidth}
          onChange={onInputChange}
          onBlur={onInputBlur}
          className='line-width-input'
        />
      )} */}
    </div>
  );
};
export default Line;
