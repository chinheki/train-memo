import React, { useState } from "react";
import { Button, InputNumber } from "antd";
import "./WeeklyTrain.scss";
import diagram from "../../../public/assets/images/muscle_diagram.png";
import Dot from "./components/Dot";
import Line from "./line";
export const muscleList = [
  { id: "muscle-1", en: "Deltoid", ch: "三角肌", jp: "三角筋", top: 106, left: 311, useTwoSide: false, part: "body" },
  { id: "muscle-2", en: "Infraspinatus", ch: "肩胛下肌", jp: "肩甲下筋", top: 32, left: 700, useTwoSide: false, part: "body" },
  { id: "muscle-3", en: "Pectoralis major", ch: "胸大肌", jp: "大胸筋", top: 63, left: 10, useTwoSide: false, part: "body" },
  { id: "muscle-4", en: "Teres major", ch: "肩胛下肌", jp: "肩甲下筋", top: 5, left: 702, useTwoSide: false, part: "body" },
  { id: "muscle-5", en: "Biceps", ch: "肱二头肌", jp: "上腕二頭筋", top: 57, left: -2, useTwoSide: false, part: "body" },
  { id: "muscle-6", en: "Latissimus dorsi", ch: "背阔肌", jp: "広背筋", top: -21, left: 705, useTwoSide: false, part: "body" },
  { id: "muscle-7", en: "Abdominals", ch: "腹肌", jp: "腹筋", top: 40, left: 126, useTwoSide: false, part: "body" },
  { id: "muscle-8", en: "Serratus anterior", ch: "前锯肌", jp: "鋸筋", top: -90, left: 300, useTwoSide: false, part: "body" },
  { id: "muscle-9", en: "Triceps", ch: "三头肌", jp: "三頭筋", top: -79, left: 709, useTwoSide: false, part: "body" },
  { id: "muscle-10", en: "External oblique", ch: "外斜肌", jp: "外腹斜筋", top: -108, left: 336, useTwoSide: false, part: "body" },
  { id: "muscle-11", en: "Brachioradialis", ch: "桡侧肌", jp: "上腕母筋", top: -97, left: 338, useTwoSide: false, part: "body" },
  { id: "muscle-12", en: "Finger extensors", ch: "指伸肌", jp: "指伸筋", top: -86, left: 337, useTwoSide: false, part: "body" },
  { id: "muscle-13", en: "Finger flexors", ch: "指屈肌", jp: "指屈筋", top: -72, left: 280, useTwoSide: false, part: "body" },
  { id: "muscle-14", en: "Gluteus medius", ch: "臀中肌", jp: "大臀中筋", top: -208, left: 719, useTwoSide: false, part: "body" },
  { id: "muscle-15", en: "Quadriceps", ch: "股四头肌", jp: "大腿四頭筋", top: -95, left: 280, useTwoSide: false, part: "body" },
  { id: "muscle-16", en: "Sartorius", ch: "缝匠肌", jp: "裁縫筋", top: -168, left: 13, useTwoSide: false, part: "body" },
  { id: "muscle-17", en: "Gluteus maximus", ch: "臀大肌", jp: "大臀筋", top: -252, left: 547, useTwoSide: false, part: "body" },
  { id: "muscle-18", en: "Hamstrings", ch: "腘绳肌", jp: "ハムストリング", top: -152, left: 391, useTwoSide: false, part: "body" },
  { id: "muscle-19", en: "Abductors", ch: "外展肌", jp: "外腓筋", top: -324, left: 15, useTwoSide: false, part: "body" },
  { id: "muscle-20", en: "Gastrocnemius", ch: "腓肠肌", jp: "腓腸筋", top: -176, left: 321, useTwoSide: false, part: "body" },
  { id: "muscle-21", en: "Tibialis anterior", ch: "胫骨前肌", jp: "前脛骨筋", top: -167, left: 337, useTwoSide: false, part: "body" },
  { id: "muscle-22", en: "Soleus", ch: "比目鱼肌", jp: "ヒラメ筋", top: -258, left: 6, useTwoSide: false, part: "body" },
  { id: "muscle-23", en: "trapezius", ch: "斜方肌", jp: "斜角筋", top: -688, left: 323, useTwoSide: false, part: "body" }
];
export const bodyPartList = [
  { id: "body-1", en: "wrist", ch: "手腕", jp: "手首", useTwoSide: true },
  { id: "body-2", en: "arm", ch: "手臂", jp: "腕", useTwoSide: true },
  { id: "body-3", en: "chest", ch: "胸", jp: "胸部", useTwoSide: false },
  { id: "body-4", en: "back", ch: "背", jp: "背中", useTwoSide: false },
  { id: "body-5", en: "waist", ch: "腰", jp: "腰", useTwoSide: false },
  { id: "body-7", en: "leg", ch: "腿", jp: "脚", useTwoSide: true },
  { id: "body-8", en: "core", ch: "核心", jp: "体幹", useTwoSide: false },
  { id: "body-9", en: "energy", ch: "体力", jp: "体力", useTwoSide: false },
  { id: "body-10", en: "strength", ch: "拉伸", jp: "ストレッチ", useTwoSide: false }
];
const lines = [
    [161, 158, 0, 30],
    [189, 146, -45, 10],
    [108, 221, -27, 110],
    [239, 495, 26, 100],
    [146, 260, -20, 60],
    [192, 243, -27, 70],
    [225, 238, -12, 100],
    [319, 174, 53, 30],
    [372, 163, 0, 30],
    [486, 160, 0, 20],
    [315, 266, 413, 60],
    [120, 476, 33, 130],
    [409, 539, -34, 60],
    [495, 246, 24, 100],
    [369, 238, 24, 60],
    [462, 226, 18, 100],
    [473, 484, -10, 100],
    [267, 286, -24, 55],
    [296, 500, -28, 30],
    [263, 500, 26, 30],
    [130, 631, -66, 100],
    [161, 652, -49, 70],
    [204, 630, -28, 100],
    [146, 471, 26, 100],
    [222, 689, 0, 30],
    [259, 662, 0, 60]
]

const lans = ["Eng", "中文", " 日本語"];
const WeeklyTrain = () => {
  const [lan, setLan] = useState(0);

  return (
    <div className="train-board">
      <div className="space-between">
        <Button
          onClick={() =>
            setLan((prev) => (prev === lans.length - 1 ? 0 : prev + 1))
          }
        >
          {lans[lan]}
        </Button>

      </div>
      <div className="status-board">
        <div className="dots" style={{ "background-image": `url(${diagram})` }}>
          {muscleMap.map((id) => {
            const { en, ch, jp, top, left } = muscleMap[id];
            return (
              <Dot
                color="#fff"
                lan={lan}
                value={{ id, en, ch, jp, top, left }}
              />
            );
          })}
          {lines.map((value) => (
            <Line value={value} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default WeeklyTrain;
