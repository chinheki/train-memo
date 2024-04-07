import { useState } from 'react';

const useTrainPlan = () => {
    const [trainList, setTrainList] = useState([]);
    const [gapTime, setGapTime] = useState(30);

    const updateTrainList = (newTrainList) => {
        console.log(newTrainList)
        setTrainList(newTrainList);
    };

    return {
        updateTrainList,
        trainList,gapTime
    };
};

export default useTrainPlan;