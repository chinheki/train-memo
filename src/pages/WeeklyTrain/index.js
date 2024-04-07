import React, { useState } from "react";
import { Button, InputNumber } from "antd";
import "./WeeklyTrain.scss";
import diagram from "../../../public/assets/images/muscle_diagram.png";
import Dot from "./components/Dot";
import Line from "./line";
export const muscleMap = {
  deltoid: ["Deltoid", "三角肌", "三角筋", 106, 311],
  infraspinatus: ["Infraspinatus", "肩胛下肌", "肩甲下筋", 32, 700],
  pectoralisMajor: ["Pectoralis major", "胸大肌", "大胸筋", 63, 10],
  teresMajor: ["Teres major", "肩胛下肌", "肩甲下筋", 5, 702],
  biceps: ["Biceps", "肱二头肌", "上腕二頭筋", 57, -2],
  latissimusDorsi: ["Latissimus dorsi", "背阔肌", "広背筋", -21, 705],
  abdominals: ["Abdominals", "腹肌", "腹筋", 40, 126],
  serratusAnterior: ["Serratus anterior", "前锯肌", "鋸筋", -90, 300],
  triceps: ["Triceps", "三头肌", "三頭筋", -79, 709],
  externalOblique: ["External oblique", "外斜肌", "外腹斜筋", -108, 336],
  brachioradialis: ["Brachioradialis", "桡侧肌", "上腕母筋", -97, 338],
  fingerExtensors: ["Finger extensors", "指伸肌", "指伸筋", -86, 337],
  fingerFlexors: ["Finger flexors", "指屈肌", "指屈筋", -72, 280],
  gluteusMedius: ["Gluteus medius", "臀中肌", "大臀中筋", -208, 719],
  Quadriceps: ["Quadriceps", "股四头肌", "大腿四頭筋", -95, 280],
  Sartorius: ["Sartorius", "缝匠肌", "裁縫筋", -168, 13],
  gluteusMaximus: ["Gluteus maximus", "臀大肌", "大臀筋", -252, 547],
  hamstrings: ["Hamstrings", "腘绳肌", "ハムストリング", -152, 391],
  abductors: ["Abductors", "外展肌", "外腓筋", -324, 15],
  gastrocnemius: ["Gastrocnemius", "腓肠肌", "腓腸筋", -176, 321],
  tibialisAnterior: ["Tibialis anterior", "胫骨前肌", "前脛骨筋", -167, 337],
  soleus: ["Soleus", "比目鱼肌", "ヒラメ筋", -258, 6],
  trapezius: ["trapezius", "斜方肌", "斜角筋", -688, 323]
};
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
  const [map, setMap] = useState({ ...muscleMap });
  const [line, setLine] = useState({ ...lines });
  const onChange = (id, top, left) => {
    setMap((prev) => ({
      ...prev,
      [id]: [prev[id][0], prev[id][1], prev[id][2], top, left]
    }));
  };
  const onChangeLine = (id, top, left, rotate, width) => {
    setLine((prev) => ({
      ...prev,
      [id]: [top, left, rotate, width]
    }));
  };
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
          {Object.keys(muscleMap).map((id) => {
            const [en, ch, jp, top, left] = muscleMap[id];
            return (
              <Dot
                color="#fff"
                lan={lan}
                value={{ id, en, ch, jp, top, left }}
                onChange={onChange}
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
