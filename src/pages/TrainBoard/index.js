import React, {
  useEffect,
  useState,
  useMemo,
  useContext,
  useCallback
} from "react";
import "./TrainBoard.scss";
import { TrainContext } from "../../App";
import TrainInPlan from "../../components/TrainInPlan";
import TrainTimePlan from "../../components/TrainTimePlan";
const TrainBoard = () => {
  const data = useContext(TrainContext);
  return (
    <>
      {!data.trainList.length && <TrainTimePlan isSingleTrain={true} />}
      {!!data.trainList.length && (
              <TrainInPlan sports={data.trainList} />
      )}
    </>
  );
};
export default TrainBoard;
