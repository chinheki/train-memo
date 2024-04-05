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
