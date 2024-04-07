import start from "../public/assets/sounds/start.mp3";
import stop from "../public/assets/sounds/stop.mp3";


export function playRelaxSound() {
  // Code to play the sound
  // You can use the HTML5 Audio element or any other library to play the sound
  const audio = new Audio(stop);
  audio.play();
}
export function playStartSound() {
  // Code to play the sound
  // You can use the HTML5 Audio element or any other library to play the sound
  const audio = new Audio(start);
  audio.play();
}
  export const getMinAndSec = (totalSeconds) => {
    if (!totalSeconds||typeof totalSeconds !== 'number') {
      return { minutes: 0, seconds: 0 };
    }
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return { minutes, seconds };
  }
export function getTotalSeconds(min, sec) {
  return (min??0) * 60 +( sec??0);
}
export function getTimerStringBySeconds(seconds) {
  const padZero = (num) => (num < 10 ? "0" + num : num);
  const minute =Math.floor(seconds / 60);
  const second = seconds % 60;
  const formattedTime = `${padZero(minute)}:${padZero(second)}`;
  return formattedTime;
}
export function getTimeList(list,gapTime) {
  const timeList = [];
  for (let i = 0; i < list.length; i++){
    const { trainTime, relaxTime, round,name,imgList,dec } = list[i];
    if (i !== 0) {
      timeList.push({imgList,dec , time: gapTime, type: "gap",turn:`1/${round}`,prex:`即将开始：${i+1}/${list.length+1} ${name} 1/${round}`})
    }
    for (let i2 = 0; i2 < round; i2++) {
      timeList.push({imgList,dec , time: trainTime, type: "train",turn:`${i2+1}/${round}`,prex:`训练中：${i+1}/${list.length+1} ${name} ${i2+1}/${round}` });
      if (i2 !== round - 1 && relaxTime >0) {
        timeList.push({ imgList,dec ,time: relaxTime, type: "relax",turn:`${i2+2}/${round}`,prex:`休息中：${i+1}/${list.length+1} ${name} ${i2+2}/${round}` });
      }
    }
  }
  console.log(timeList)
  return timeList;
}

 export const shuffleList = (list) => {
    const shuffledList = [...list];
    for (let i = shuffledList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
   }
   return shuffledList
  };