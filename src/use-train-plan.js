import { useState } from 'react';

const useTrainPlan = () => {
    const [trainList, setTrainList] = useState([]);

    const updateTrainList = (newTrainList) => {
        console.log(newTrainList)
        setTrainList(newTrainList);
    };

    return {
        updateTrainList,
        trainList,
    };
};

export default useTrainPlan;