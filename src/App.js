import React, { createContext, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import "./App.scss";
import "./i18n";
import { Button, InputNumber, Input, Upload } from "antd";
import { Outlet } from "react-router-dom";
import diagram from "../public/assets/images/bk.jpg";
import useLocalStorage from "./use-local-storage";
import useTrainPlan from "./use-train-plan";
export const DataContext = createContext(null);
export const UpdateDataContext = createContext({
  update: () => {},
  insert: () => {},
  remove: () => {}
});
export const TrainContext = createContext({
  updateTrainList: () => {},
  trainList: []
});
const App = () => {
  const value = useLocalStorage();
  const trainData = useTrainPlan();
  const onChangeToken = (v) => {
    value.updateToken(v.target.value);
  };
  return (
    <div className="content">
      <div className="bk" style={{ backgroundImage: `url(${diagram})` }} />
      {value.token ? (
        <DataContext.Provider value={{ ...value.data, token: value.token }}>
          <UpdateDataContext.Provider
            value={{
              update: value.updateData,
              insert: value.insertData,
              remove: value.deleteData
            }}
          >
            <TrainContext.Provider value={trainData}>
              <Sidebar />
              <Outlet />
            </TrainContext.Provider>
          </UpdateDataContext.Provider>
        </DataContext.Provider>
      ) : (
        <div className="train-board">
          <div className="train-row">
            TOKEN:
            <Input onChange={onChangeToken} value={value.token}></Input>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
