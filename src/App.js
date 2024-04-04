import React,{createContext,useEffect,useState} from "react";
import Sidebar from "./components/Sidebar";
import "./App.scss";
import "./i18n";
import { Outlet } from "react-router-dom";
import diagram from "../public/assets/images/bk.jpg";
import useLocalStorage from "./use-local-storage";
import useTrainPlan from "./use-train-plan";
export const DataContext = createContext(null);
export const UpdateDataContext = createContext({update:()=>{},insert:()=>{},remove:()=>{}});
export const TrainContext = createContext({updateTrainList:()=>{},trainList:[]});
const App = () => {
  const value = useLocalStorage();
  const trainData = useTrainPlan();
  
  return (
    <DataContext.Provider value={value.data}>
    <UpdateDataContext.Provider value={{update:value.updateData,insert:value.insertData,remove:value.deleteData}}>
    <TrainContext.Provider value={trainData}>
      
      <div className="content">
        <div className='bk'  style={{ backgroundImage: `url(${diagram})` }}/>
       <Outlet />
       
      </div>
       <Sidebar />
    </TrainContext.Provider>
    </UpdateDataContext.Provider>
    </DataContext.Provider>
  );
};

export default App;
