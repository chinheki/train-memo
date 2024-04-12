import React, {
  useEffect,
  useState,
  useMemo,
  useContext,
  useCallback
} from "react";
import "./TrainBoard.scss";
import { TrainContext } from "../../App";
import TrainForm from "../../components/TrainForm";
import { getTimeList } from "../../utils";
import TimerWithAction from "../../components/TimerWithAction";
const TrainBoard = () => {
  const data = useContext(TrainContext);
  const timeList = useMemo(() => {
    return getTimeList(data.trainList || [], data?.gapTime ?? 0);
  }, [data.trainList, data?.gapTime]);
  return (
    <>
      {!data.trainList.length && <TrainForm isSingleTrain={true} />}
      {!!data.trainList.length && (
        <div className="train-board" style={{ height: "100%" }}>
          <TimerWithAction timeList={timeList} />
        </div>
      )}
    </>
  );
};
export default TrainBoard;
