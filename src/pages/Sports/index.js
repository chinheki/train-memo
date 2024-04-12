import React, {
  useEffect,
  useState,
  useMemo,
  useContext,
  useCallback
} from "react";
import "./Sports.scss";
import { Button, Checkbox, Select, InputNumber, Modal, message } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import {
  DataContext,
  StatusContext,
  TrainContext,
  UpdateDataContext
} from "../../App";
import PartSelect from "../../components/PartSelect";
import { redirect, Link } from "react-router-dom";
import { useNavigate } from "react-router";
import TrainForm from "../../components/TrainForm";
import { shuffleList } from "../../utils";
import { bodyPartList, muscleList } from "../WeeklyTrain";
import { deleteImage } from "../../store/use-image-server";
const columnPattern = ["锻炼部位", "使用肌肉", "训练模式", "训练时长", "操作"];
const SportsList = () => {
  const data = useContext(DataContext);
  const plan = useContext(TrainContext);
  const navigate = useNavigate();
  const { update, insert, remove } = useContext(UpdateDataContext);
  const user = useContext(StatusContext);
  const [newRow, setNewRow] = useState(false);
  const [sortMode, setSortMode] = useState(false);
  const [editSport, setSport] = useState(null);
  const [checked, setChecked] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [randomSetting, setRandom] = useState({
    anaerobic: true,
    aerobic: true,
    strength: true,
    time: 20
  });
  const [pattern, setPattern] = useState(0);
  const [filter, setFilter] = useState({ body: [], muscle: [] });
  const [lan, setLan] = useState(0);
  const handleChange = (value, field) => {
    setFilter((prev) => ({ ...prev, [field]: value }));
  };
  const afterSavePlan = () => {
    setNewRow(false);
    setSport(null);
  };
  const onEdit = (plan) => {
    setSport(plan);
    setNewRow(true);
  };

  const onDelete = useCallback(
    async (plan) => {
      await plan.imgList.forEach((f) => deleteImage(f, data.token));
      const res = await remove(plan.stockId, plan.id);
      if (res) {
        message.success("刪除成功");
      } else {
        message.error("刪除失败");
      }
    },
    [data.token, remove]
  );
  const mobile = useMemo(() => window.innerWidth < 600, [window.innerWidth]);

  const filterList = useMemo(
    () =>
      (data?.sports || []).filter(
        (s) =>
          !filter.body.length ||
          (filter.body.some((p) => s.type.some((t) => t.id === p)) &&
            !filter.muscle.length) ||
          filter.muscle.some((p) => s.type.some((t) => t.id === p))
      ),
    [data?.sports, filter]
  );
  const randomTotalTime = useMemo(() => {
    let totalTime = 0;
    checked.forEach((id) => {
      const sport = (filterList || []).find((s) => s.id === id);
      if (sport) {
        totalTime += calcTotalTime(sport);
      }
    });
    totalTime +=
      (plan?.gapTime ?? 0) * (checked.length - 1 > 0 ? checked.length : 0);
    return calculateTotalTime(totalTime, 0, 1);
  }, [checked, filterList, plan?.gaptime]);
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
  const disabledSports = useMemo(
    () =>
      (data?.sports || [])
        .filter((s) =>
          s.type.some((t) => {
            const disabledType = (user?.status || []).find((s) => s.id == t.id);
            if (disabledType) {
              if (t.useBothSide) return true;
              if (disabledType.left && disabledType.right) {
                return true;
              }
            }
          })
        )
        .map(({ id }) => id),
    [user, data?.sports]
  );

  const onRandomCheck = useCallback(() => {
    const sportList =
      filterList
        .filter((s) => !disabledSports.includes(s.id))
        .map((s) => ({ id: s.id, time: calcTotalTime(s) })) || [];
    const selectedSports = [];
    let totalTime = 0;
    const newList = shuffleList(sportList);
    for (let i = 0; i < newList.length; i++) {
      if (totalTime > (randomSetting.time ?? 20) * 60) break;
      if (i > 0) {
        totalTime += plan?.gapTime ?? 0;
      }
      selectedSports.push(newList[i].id);
      totalTime += newList[i].time;
    }

    setChecked(selectedSports);
  }, [filterList, plan?.gapTime, disabledSports, randomSetting]);

  const onCheckAllChange = useCallback(
    (v) => {
      if (v.target.checked || v.target.aria - checked) {
        setChecked(filterList.map((s) => s.id) || []);
      } else {
        setChecked([]);
      }
    },
    [indeterminate, checkAll, filterList]
  );
  const upRow = useCallback(
    (id, up = false) => {
      const newList = [...checked];
      const index = checked.findIndex((s) => s === id);
      if (index !== -1 && index < checked.length - 1 && !up) {
        const temp = newList[index];
        newList[index] = newList[index + 1];
        newList[index + 1] = temp;
      } else if (index !== -1 && index > 0 && up) {
        const temp = newList[index];
        newList[index] = newList[index - 1];
        newList[index - 1] = temp;
      }
      setChecked([...newList]);
    },
    [checked]
  );
  const checkAll = useMemo(
    () => checked.length === filterList.length,
    [checked, filterList]
  );
  const indeterminate = useMemo(
    () => checked.length > 0 && checked.length < filterList.length,
    [checked, filterList]
  );

  const generatePlan = useCallback(
    (e) => {
      e.preventDefault();
      if (sortMode) {
        plan.updateTrainList(
          checked
            .map((id) => (filterList || []).find((s) => s.id === id))
            .filter((d) => !!d)
        );
        navigate("/");
      } else {
        setSortMode(true);
      }
    },
    [checked, plan, filterList, redirect, sortMode]
  );
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
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="筛选健身类型"
              defaultValue={[]}
              onChange={(v) => handleChange(v, "body")}
            >
              {bodyPartList.map(({ en, ch, jp, id }) => (
                <Select.Option key={id} value={id}>
                  {lan === 0 ? ch : lan === 1 ? en : jp}
                </Select.Option>
              ))}
            </Select>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="筛选肌肉部位"
              defaultValue={[]}
              onChange={(v) => handleChange(v, "muscle")}
            >
              {muscleList.map(({ en, ch, jp, id }) => (
                <Select.Option key={id} value={id}>
                  {lan === 0 ? ch : lan === 1 ? en : jp}
                </Select.Option>
              ))}
            </Select>
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
          <table className="sports-grid scroll">
            {(sortMode
              ? checked
                  .map((id) => (data.sports || []).find((s) => s.id === id))
                  .filter((s) => !!s)
              : filterList
            ).map((s, i) => (
              <tr key={s.id}>
                {!sortMode && (
                  <td>
                    <Checkbox
                      onChange={() => onCheck(s.id)}
                      disabled={disabledSports.includes(s.id)}
                      checked={checked.includes(s.id)}
                    ></Checkbox>
                  </td>
                )}
                {sortMode && (
                  <td>
                    {i > 0 && (
                      <CaretUpOutlined onClick={() => upRow(s.id, true)} />
                    )}
                    {i < checked.length - 1 && (
                      <CaretDownOutlined onClick={() => upRow(s.id)} />
                    )}
                  </td>
                )}
                <td> {s.name}</td>
                {(!mobile || pattern === 0) && (
                  <td>
                    <PartSelect type={s.type} view setType={() => {}} />
                  </td>
                )}
                {(!mobile || pattern === 1) && (
                  <td>
                    <PartSelect
                      type={s.type}
                      view
                      useMuscle
                      setType={() => {}}
                    />
                  </td>
                )}
                {(!mobile || pattern === 2) && (
                  <td> {formatTime(s.trainTime, s.round)}</td>
                )}
                {(!mobile || pattern === 3) && (
                  <td>
                    {calculateTotalTime(s.trainTime, s.relaxTime, s.round)}
                  </td>
                )}
                {(!mobile || pattern === 4) && (
                  <td>
                    <Button onClick={() => onEdit(s)}>更新</Button>
                  </td>
                )}
                {(!mobile || pattern === 4) && (
                  <td>
                    <Button onClick={() => onDelete(s)}>刪除</Button>
                  </td>
                )}
              </tr>
            ))}
          </table>
          <div className="sport-row">
            <Button onClick={() => setNewRow(true)}>添加</Button>
          </div>
          <div className="sport-row">
            {!sortMode && <Button onClick={onRandomCheck}>随机选择</Button>}
            {!sortMode && (
              <Button onClick={() => setIsModalOpen(true)}>设定</Button>
            )}
            {sortMode && (
              <Button onClick={() => setSortMode(false)}>重新选择</Button>
            )}
            <Button onClick={generatePlan} disabled={!checked.length}>
              生成训练计划(共{randomTotalTime})
            </Button>
          </div>
        </div>
      )}
      {newRow && <TrainForm afterSavePlan={afterSavePlan} sport={editSport} />}
      <Modal
        footer={[
          <Button key="back" onClick={() => setIsModalOpen(false)}>
            Ok
          </Button>
        ]}
        title="随机选择设定"
        open={isModalOpen}
        closeIcon={null}
      >
        <Checkbox
          onChange={() =>
            setRandom((prev) => ({ ...prev, anaerobic: !prev.anaerobic }))
          }
          checked={randomSetting.anaerobic}
        >
          无氧
        </Checkbox>
        <Checkbox
          onChange={() =>
            setRandom((prev) => ({ ...prev, aerobic: !prev.aerobic }))
          }
          checked={randomSetting.aerobic}
        >
          有氧
        </Checkbox>
        <Checkbox
          onChange={() =>
            setRandom((prev) => ({ ...prev, strength: !prev.strength }))
          }
          checked={randomSetting.strength}
        >
          拉伸
        </Checkbox>
        <div>
          训练时长
          <InputNumber
            value={randomSetting.time}
            onChange={(v) => setRandom((prev) => ({ ...prev, time: v }))}
            label="训练时长"
          />
          分钟
        </div>
      </Modal>
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
