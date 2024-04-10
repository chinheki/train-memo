import { useState,useEffect  } from 'react';
export const useUserStatus = () => {
const [userId,setUserId]=useState("kanehoshii")
    const [status, setStatus] = useState([{ id: "body-1", left: true,right:true }])
    const [weeklyData, setWeeklyData] = useState([])
    const updateStatus = (newStatus) => {
        setStatus(newStatus)
    }
    const updateUserId = (v) => {
        setUserId(v)
    localStorage.setItem("train-memo-user",v);
    }
    const updateWeeklyData = (newData) => {
        setWeeklyData(newData)
    }
    useEffect(() => {
    const user = localStorage.getItem("train-memo-user");
        setUserId(user)
    }, [])
    return { user: { userId, status },updateStatus,updateWeeklyData,weeklyData,updateUserId }
}