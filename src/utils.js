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
  return min * 60 + sec;
}
export function getTimerStringBySeconds(seconds) {
  const padZero = (num) => (num < 10 ? "0" + num : num);
  const minute =Math.floor(seconds / 60);
  const second = seconds % 60;
  const formattedTime = `${padZero(minute)}:${padZero(second)}`;
  return formattedTime;
}
