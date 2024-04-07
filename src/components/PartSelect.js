import React, {
  useEffect,
  useState,
  useMemo,
  useContext,
  useCallback
} from "react";
import { Button, InputNumber,Input } from "antd";
import { muscleMap } from "../pages/WeeklyTrain";
const options = [
  { name: "手腕", twoSide: true, checked: false },
  { name: "上臂", twoSide: true, checked: false },
  { name: "小臂", twoSide: true, checked: false },
  { name: "腰", twoSide: false, checked: false },
  { name: "背", twoSide: false, checked: false },
  { name: "胸", twoSide: false, checked: false },
  { name: "腿", twoSide: true, checked: false },
  { name: "躯干", twoSide: false, checked: false },
  { name: "体力", twoSide: false, checked: false },
  { name: "拉伸", twoSide: false, checked: false }
];
const proOptions=Object.keys(muscleMap).map((id)=>({name:muscleMap[id][1],twoSide:false,checked:false}))
const PartSelect = ({ type, setType, view }) => {
  const [pro, setPro] = useState(true);
  const op=useMemo(()=>view?([...proOptions,...options]):pro?proOptions:options,[pro,view])
  const onClick = useCallback(
    (name, twoSide) => {
      const c = type.find((t) => t.name === name);
      if (c) {
        if (!twoSide || !c.useBothSide) {
          setType(type.filter((t) => t.name !== name));
        } else {
          setType(
            type.map((t) =>
              t.name === name ? { ...t, useBothSide: false } : t
            )
          );
        }
      } else {
        const add = op.find((t) => t.name === name);
        setType([...type, { ...add, checked: true, useBothSide: add.twoSide }]);
      }
    },
    [type,op]
  );
  return (
    <>
      {!view&&
      <Button onClick={()=>setPro(prev=>!prev)}>
          ({pro?"肌肉部位":"大致部位"})
        </Button>
      }
      {op.map(({ name, twoSide }) => {
        const c = type.find((t) => t.name === name);
        return !view || !!c ? (
          <div
            onClick={() => onClick(name, twoSide)}
            className={`part${!!c ? " checked" : ""}`}
          >
            {name}
            {!!c && twoSide ? (c.useBothSide ? "(左右)" : "(单侧)") : ""}
          </div>
        ) : null;
      })}
    </>
  );
};
export default PartSelect;
