import { useState } from 'react';
export const useUserStatus = () => {
const [userId,setUserId]=useState("kanehoshii")
    const [status, setStatus] = useState([{ id: "body-1", left: true,right:true }])
    const [weeklyData, setWeeklyData] = useState([])
    const updateStatus = (newStatus) => {
        setStatus(newStatus)
    }
    const updateWeeklyData = (newData) => {
        setWeeklyData(newData)
    }
    return { user: { userId, status },updateStatus,updateWeeklyData,weeklyData }
}