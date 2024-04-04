import React, {
  useEffect,
  useState,
  useMemo,
  useContext,
  useCallback
} from "react";
import "./Sports.scss";
import { Button, Checkbox, InputNumber } from "antd";
import { DataContext, TrainContext, UpdateDataContext } from "../../App";
import SingleTrainPlan from "../TrainBoard/SingleTrainPlan";
import PartSelect from "../TrainBoard/PartSelect";
import { redirect, Link } from "react-router-dom";
import { useNavigate } from "react-router";
const SportsList = () => {
  const data = useContext(DataContext);
  const plan = useContext(TrainContext);
  const navigate = useNavigate();
  const { update, insert, remove } = useContext(UpdateDataContext);
  const [newRow, setNewRow] = useState(false);
  const [editSport, setSport] = useState(null);
  const [checked, setChecked] = useState([]);
  const savePlan = (plan) => {
    if (plan.id) {
      update("sports", plan);
    } else {
      insert("sports", plan);
    }
    setNewRow(false);
    setSport(null);
  };
  const onEdit = (plan) => {
    setSport(plan);
    setNewRow(true);
  };
  const onDelete = (plan) => {
    remove("sports", plan.id);
  };
  const randomTotalTime = useMemo(() => {
    let totalTime = 0;
    checked.forEach((id) => {
      const sport = (data?.sports || []).find((s) => s.id === id);
      if (sport) {
        totalTime += calcTotalTime(sport);
      }
    });
    return calculateTotalTime(totalTime, 0, 1);
  }, [checked, data?.sport]);
  const onCheck = useCallback(
    (id) => {
      if (checked.includes(id)) {
        setChecked(checked.filter((item) => item !== id));
      } else {
        setChecked([...checked, id]);
      }
    },
    [checked]
  );
  const onRandomCheck = useCallback(
    (id) => {
      const sportList = data?.sports || [];
      const selectedSports = [];
      let totalTime = 0;

      while (totalTime < 15 * 60 || totalTime > 20 * 60) {
        selectedSports.length = 0;
        totalTime = 0;

        for (let i = 0; i < sportList.length; i++) {
          if (Math.random() < 0.5) {
            selectedSports.push(sportList[i]);
            totalTime += calcTotalTime(sportList[i]);
          }
        }
      }

      setChecked(selectedSports.map((sport) => sport.id));
    },
    [data?.sports]
  );
  const generatePlan = useCallback(() => {
    plan.updateTrainList(
      checked
      .map((id) => (data?.sports || []).find((s) => s.id === id))
      .filter((d) => !!d)
      );
      navigate("/");
  }, [checked, plan, data?.sports,redirect]);
  return (
    <>
      {!newRow && (
        <div className="train-board">
          <div className="train-row">训练项目</div>
          <div className="train-row">---------------</div>
          <div className="sports-grid">
            {(data?.sports ?? []).map((s) => (
              <>
                <Checkbox
                  onChange={() => onCheck(s.id)}
                  checked={checked.includes(s.id)}
                ></Checkbox>
                <div> {s.name}</div>
                <div>
                  <PartSelect type={s.type} view />
                </div>
                <div> {formatTime(s.trainTime, s.round)}</div>
                <div>
                  {" "}
                  {calculateTotalTime(s.trainTime, s.relaxTime, s.round)}
                </div>
                <Button onClick={() => onEdit(s)}>更新</Button>
                <Button onClick={() => onDelete(s)}>刪除</Button>
              </>
            ))}
          </div>
          <div className="sport-row">
            <Button onClick={() => setNewRow(true)}>添加</Button>
          </div>
          <div className="sport-row">
            <Button onClick={onRandomCheck}>随机选择</Button>
            <Button onClick={generatePlan} disabled={!checked.length}>
              生成训练计划(共{randomTotalTime})
            </Button>
          </div>
        </div>
      )}
      {newRow && <SingleTrainPlan savePlan={savePlan} sport={editSport} />}
    </>
  );
};
export default SportsList;
const formatTime = (seconds, round) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const roundedMinutes = Math.round(minutes);
  const roundedSeconds = Math.round(remainingSeconds);
  if (roundedMinutes === 0) {
    return `${roundedSeconds}s * ${round}`;
  } else {
    return `${roundedMinutes}m${roundedSeconds}s * ${round}`;
  }
};
const calculateTotalTime = (trainTime, relaxTime, repeat) => {
  const totalTime = trainTime * repeat + relaxTime * (repeat - 1);
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;
  if (minutes === 0) {
    return `${seconds}s`;
  } else {
    return `${minutes}m${seconds}s`;
  }
};
const calcTotalTime = (sport) => {
  return sport.trainTime * sport.round + sport.relaxTime * (sport.round - 1);
};
