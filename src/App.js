import React,{createContext,useEffect,useState} from "react";
import Sidebar from "./components/Sidebar";
import "./App.scss";
import "./i18n";
import { Outlet } from "react-router-dom";
import diagram from "../public/assets/images/bk.jpg";
import useLocalStorage from "./use-local-storage";
import {v4} from 'uuid'
import { json2csv } from "json-2-csv";
import { Button } from "antd/es/radio"; 
import { saveAs } from 'file-saver';
export const DataContext = createContext(null);
export const UpdateDataContext = createContext({update:()=>{},insert:()=>{},remove:()=>{}});
const App = () => {
  // const [csvFilePath, setPath] = useState(null);
  const value = useLocalStorage()
  // const onChange = async (e) => {
  //   const dirHandle = await window.showDirectoryPicker();
  //   console.log(dirHandle)
  //   const initData = {
  //   sports: [],
  //   weekWorks: [],
  //   status:{}
  // }
  //create CSV file data in an array  
  // var csvFileData = json2csv(initData);  
  //   const path = `${dirHandle.name}/train-memo-${v4()}.csv`
  //   localStorage.setItem('csvFilePath',path);
  //   saveAs(new Blob([csvFileData], {type: "text/plain;charset=utf-8"}),path);
  //     setPath(path);

  // }
  // useEffect(() => {
  //   const csvFilePath = localStorage.getItem('csvFilePath');
  //     setPath(csvFilePath);
  // },[])
  return (
    <DataContext.Provider value={value.data}>
    <UpdateDataContext.Provider value={{update:value.updateData,insert:value.insertData,remove:value.deleteData}}>
      
      <div className="content">
        <div className='bk'  style={{ backgroundImage: `url(${diagram})` }}/>
       <Outlet />
       
      </div>
       <Sidebar />
    </UpdateDataContext.Provider>
    </DataContext.Provider>
  );
};

export default App;
