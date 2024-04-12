import React, { createContext, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import "./App.scss";
import "./i18n";
import { Button, InputNumber, Input, ConfigProvider } from "antd";
import { Outlet } from "react-router-dom";
import diagram from "../public/assets/images/bk.jpg";
import useLocalStorage from "./store/use-local-storage";
import useTrainPlan from "./store/use-train-plan";
import { useUserStatus } from "./store/use-user-status";
import Login from "./pages/Login";
export const DataContext = createContext(null);
export const StatusContext = createContext({
  user: { userId: "", status: [] }
});
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
  const user = useUserStatus();
  const onChangeToken = (v) => {
    value.updateToken(v);
  };
  const onChangeUser = (v) => {
    user.updateUserId(v);
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "darkcyan",
          borderRadius: "4px"
        },
        components: {
          Button: {
            colorPrimary: "darkcyan"
          }
        }
      }}
    >
      <div className="content">
        <div className="bk" style={{ backgroundImage: `url(${diagram})` }} />
        {value.token && user.user.userId ? (
          <DataContext.Provider
            value={{ sports: value.sports, token: value.token }}
          >
            <StatusContext.Provider value={user.user}>
              <UpdateDataContext.Provider
                value={{
                  update: value.updateSport,
                  insert: value.insertSport,
                  remove: value.deleteData
                }}
              >
                <TrainContext.Provider value={trainData}>
                  <Sidebar />
                  <Outlet />
                </TrainContext.Provider>
              </UpdateDataContext.Provider>
            </StatusContext.Provider>
          </DataContext.Provider>
        ) : (
          <Login
            localUserId={user.user.userId}
            loaclToken={value.token}
            onChangeToken={onChangeToken}
            onChangeUser={onChangeUser}
          />
        )}
      </div>
    </ConfigProvider>
  );
};

export default App;
