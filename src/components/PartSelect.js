import React, {
  useEffect,
  useState,
  useMemo,
  useContext,
  useCallback
} from "react";
import { Button, InputNumber, Input } from "antd";
import { bodyPartList, muscleList } from "../pages/WeeklyTrain";

const bodyOptions = bodyPartList.map(({ id, ch, jp, en }) => ({
  id,
  ch,
  jp,
  en,
  checked: false
}));
const proOptions = muscleList.map(({ id, ch, jp, en }) => ({
  id,
  ch,
  jp,
  en,
  checked: false
}));
const PartSelect = ({ type, setType, view, useMuscle }) => {
  const [pro, setPro] = useState(false);
  const [lan, setLan] = useState(0);
  const op = useMemo(
    () =>
      view
        ? useMuscle
          ? proOptions
          : bodyOptions
        : pro
        ? proOptions
        : bodyOptions,
    [pro, view]
  );
  const onClick = useCallback(
    (id) => {
      const checked = type.find((t) => t.id === id);
      if (checked) {
        setType(type.filter((t) => t.id != id));
      } else {
        const add = op.find((t) => t.id === id);
        setType([...type, { id: add.id, checked: true }]);
      }
    },
    [type, op]
  );
  return (
    <>
      {!view && (
        <div className="train-row  space-between">
          训练部位：
          <div>
            <Button
              onClick={() => setPro((prev) => !prev)}
              className="simple-btn"
            >
              ({pro ? "肌肉部位" : "身体部位"})
            </Button>
            <Button
              onClick={() => setLan((prev) => (prev < 2 ? prev + 1 : 0))}
              className="simple-btn"
            >
              ({lan === 0 ? "中文" : lan === 2 ? "日文" : "英文"})
            </Button>
          </div>
        </div>
      )}
      <div
        className="train-row"
        style={{ justifyContent: "flex-start", flexDirection: "row" }}
      >
        {op.map(({ ch, jp, en, id }) => {
          const dataType = type.find((t) => t.id === id);
          return !view || !!dataType ? (
            <div
              onClick={() => onClick(id)}
              className={`part${!!dataType ? " checked" : ""}`}
            >
              {lan === 0 ? ch : lan === 2 ? jp : en}
            </div>
          ) : null;
        })}
      </div>
    </>
  );
};
export default PartSelect;
