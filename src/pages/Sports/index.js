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
import PartSelect from "../../components/PartSelect";
import { redirect, Link } from "react-router-dom";
import { useNavigate } from "react-router";
import TrainTimePlan from "../../components/TrainTimePlan";
import { shuffleList } from "../../utils";
import { deleteImage } from "../../use-image-server";
const columnPattern = ["锻炼部位", "训练模式", "训练时长", "操作"];
const SportsList = () => {
  const data = useContext(DataContext);
  const plan = useContext(TrainContext);
  const navigate = useNavigate();
  const { update, insert, remove } = useContext(UpdateDataContext);
  const [newRow, setNewRow] = useState(false);
  const [editSport, setSport] = useState(null);
  const [checked, setChecked] = useState([]);
  const [pattern, setPattern] = useState(0);
  const afterSavePlan = () => {
    setNewRow(false);
    setSport(null);
  };
  const onEdit = (plan) => {
    setSport(plan);
    setNewRow(true);
  };
  const onDelete = (plan) => {
      plan.imgList.forEach((f)=>deleteImage(f))
    remove("sports", plan.id);
  };
  const mobile = useMemo(() => window.innerWidth < 800, [window.innerWidth]);
  const randomTotalTime = useMemo(() => {
    let totalTime = 0;
    checked.forEach((id) => {
      const sport = (data?.sports || []).find((s) => s.id === id);
      if (sport) {
        totalTime += calcTotalTime(sport);
      }
    });
    totalTime +=
      (plan?.gapTime ?? 0) * (checked.length - 1 > 0 ? checked.length : 0);
    return calculateTotalTime(totalTime, 0, 1);
  }, [checked, data?.sport, plan?.gaptime]);
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
    () => {
      const sportList =
        data?.sports.map((s) => ({ id: s.id, time: calcTotalTime(s) })) || [];
      const selectedSports = [];
      let totalTime = 0;
      const newList = shuffleList(sportList);
      for (let i = 0; i < newList.length; i++) {
        if (totalTime > 20 * 60) break;
        if (i > 0) {
          totalTime += plan?.gapTime ?? 0;
        }
        selectedSports.push(newList[i].id);
        totalTime += newList[i].time;
      }

      setChecked(selectedSports);
    },
    [data?.sports, plan?.gapTime]
  );
  const onCheckAllChange = useCallback(
    (v) => {
      if (v.target.checked || v.target.aria - checked) {
        setChecked(data?.sports.map((s) => s.id) || []);
      } else {
        setChecked([]);
      }
    },
    [indeterminate, checkAll, data?.sports]
  );
  const checkAll = useMemo(
    () => checked.length === data?.sports.length,
    [checked, data?.sports]
  );
  const indeterminate = useMemo(
    () => checked.length > 0 && checked.length < data?.sports.length,
    [checked, data?.sports]
  );
  const generatePlan = useCallback(() => {
    plan.updateTrainList(
      checked
        .map((id) => (data?.sports || []).find((s) => s.id === id))
        .filter((d) => !!d)
    );
    navigate("/");
  }, [checked, plan, data?.sports, redirect]);
  return (
    <>
      {!newRow && (
        <div className="train-board">
          <div className="space-between">
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              全选
            </Checkbox>
            {!!mobile && (
              <Button
                onClick={() =>
                  setPattern((prev) =>
                    prev === columnPattern.length - 1 ? 0 : prev + 1
                  )
                }
              >
                {columnPattern[pattern]}
              </Button>
            )}
          </div>
          <div
            className="sports-grid scroll"
            style={{
              gridTemplateColumns: mobile
                ? "20px repeat(2, 1fr)"
                : "20px repeat(5, 1fr)"
            }}
          >
            {(data?.sports ?? []).map((s) => (
              <>
                <Checkbox
                  onChange={() => onCheck(s.id)}
                  checked={checked.includes(s.id)}
                ></Checkbox>
                <div> {s.name}</div>
                {(!mobile || pattern === 0) && (
                  <div>
                    <PartSelect type={s.type} view />
                  </div>
                )}
                {(!mobile || pattern === 1) && (
                  <div> {formatTime(s.trainTime, s.round)}</div>
                )}
                {(!mobile || pattern === 2) && (
                  <div>
                    {calculateTotalTime(s.trainTime, s.relaxTime, s.round)}
                  </div>
                )}
                {(!mobile || pattern === 3) && (
                  <div>
                    <Button onClick={() => onEdit(s)}>更新</Button>
                    <Button onClick={() => onDelete(s)}>刪除</Button>
                  </div>
                )}
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
      {newRow && (
        <TrainTimePlan afterSavePlan={afterSavePlan} sport={editSport} />
      )}
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
