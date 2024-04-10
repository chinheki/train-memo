import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { IMAGE_SPLIT } from "./use-image-server";
import { Octokit } from "@octokit/rest";
import { owner, repo } from "./use-image-server";
import { v4 as uuidv4 } from "uuid";
import { muscleList } from "../pages/WeeklyTrain";
const SPLIT = "$$$";
const LIST_SPLIT = ",";
const maxStock = 60000;
const useLocalStorage = () => {
  const [token, setToken] = useState(null);
  const [sports, setSports] = useState([]);
  const [sportsStock, setSportsStock] = useState([]);
  const [plans, setPlans] = useState([]);

  const updateToken = (v) => {
    localStorage.setItem("train-memo-token", v);
    setToken(v);
  };
  const fetchSportsData = async () => {
    axios
      .get(
        "https://api.github.com/repos/chinheki/train-memo/issues/3/comments?per_page=100",
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: {
              access_token: token,
              scope: "repo,gist",
              token_type: "bearer"
            },
            "X-GitHub-Api-Version": "2022-11-28"
          }
        }
      )

      .then((r) => {
        if (r.message || !r.data) {
          window.alert(r.message || "get sports list error");
          const localData = localStorage.getItem("train-memo-data-sports");
          // return localData?JSON.parse(localData):{sports:[]};
          setSports(localData ? JSON.parse(localData) : []);
          return;
        }
        if (!r.data) return;
        const sports = [];
        const stock = [];
        r.data.forEach((body) => {
          stock.push({ id: body.id, isMax: body.body.length > maxStock });
          sports.push(
            ...JSON.parse(body.body).map((r) => ({ ...r, stockId: body.id }))
          );
        });
        setSports(sports);
        setSportsStock(stock);
        localStorage.setItem("train-memo-data-sports", JSON.stringify(sports));
        localStorage.setItem("train-memo-data-stock", JSON.stringify(stock));
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  };
  const insertSport = useCallback(
    async (value) => {
      const newSport = { id: uuidv4(), ...value };
      const stockId = sportsStock.find(({ isMax }) => !isMax)?.id;
      if (stockId) {
        const sportsList = sports.filter((s) => s.stockId === stockId);
        sportsList.push(newSport);
        const body = JSON.stringify(sportsList.map(s=>({...s,stockId:undefined})));
        axios
          .post(
            "https://api.github.com/repos/chinheki/train-memo/issues/comments/" +
              stockId,
            {
              body: body
            },
            {
              headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${token}`,
                "X-GitHub-Api-Version": "2022-11-28"
              }
            }
          )
          .catch((e) => {
            console.log(e);
          })
          .then((r) => {
            sports.push({ ...newSport, stockId });
            setSports([...sports]);
            if (body.length > maxStock) {
              setSportsStock([...sportsStock.filter(s=>s.id!==stockId), { id: stockId, isMax: true }]);
            }
          });
      } else {
        const body = JSON.stringify([newSport]);
        axios
          .post(
            "https://api.github.com/repos/chinheki/train-memo/issues/3/comments",
            {
              body:body
            },
            {
              headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${token}`,
                "X-GitHub-Api-Version": "2022-11-28"
              }
            }
          )
          .catch((e) => {
            console.log(e);
          })
          .then((r) => {
             sports.push({ ...newSport, stockId:r.data.id });
            setSports([...sports]);
            setSportsStock([...sportsStock, { id: r.data.id, isMax: body.length > maxStock }]);
             localStorage.setItem("train-memo-data-sports", JSON.stringify(sports));
        localStorage.setItem("train-memo-data-stock", JSON.stringify(stock));
          });
      }
    },
    [sports]
  );

  const updateSport = async ( value) => {
        const body = JSON.stringify(sportsList.map(s=>({...s,stockId:undefined})));
    axios
      .post(
        "https://api.github.com/repos/chinheki/train-memo/issues/comments/" +
          stockId,
        {
          body: body
        },
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${token}`,
            "X-GitHub-Api-Version": "2022-11-28"
          }
        }
      )
      .catch((e) => {
        console.log(e);
      })
      .then((r) => {
        const newlist = sports.map((s) => s.id === value.id?{...value}:s)
            setSports([...newlist]);
            if (body.length > maxStock) {
              setSportsStock([...sportsStock.filter(s=>s.id!==stockId), { id: stockId, isMax: true }]);
        }
         localStorage.setItem("train-memo-data-sports", JSON.stringify(sports));
        localStorage.setItem("train-memo-data-stock", JSON.stringify(stock));
        
      });
  };
  const deleteSport = async (stockId, id) => {
    const body = JSON.stringify(sportsList.filter(s => s.id !== id).map(s => ({ ...s, stockId: undefined })));
    if (body.length) {
      axios
        .post(
          "https://api.github.com/repos/chinheki/train-memo/issues/comments/" +
          stockId,
          {
            body: body
          },
          {
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: `Bearer ${token}`,
              "X-GitHub-Api-Version": "2022-11-28"
            }
          }
        )
        .catch((e) => {
          console.log(e);
        })
        .then((r) => {
          const newlist = sports.filter((s) => s.id !== id );
          setSports([...newlist]);
          if (body.length > maxStock) {
            setSportsStock([...sportsStock.filter(s => s.id !== stockId), { id: stockId, isMax: true }]);
          }
          localStorage.setItem("train-memo-data-sports", JSON.stringify(sports));
          localStorage.setItem("train-memo-data-stock", JSON.stringify(stock));
        
        });
    } else {
      axios
        .delete(
          "https://api.github.com/repos/chinheki/train-memo/issues/comments/" +
          stockId,
          {
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: `Bearer ${token}`,
              "X-GitHub-Api-Version": "2022-11-28"
            }
          }
        )

        .then((r) => {
           const newlist = sports.filter((s) => s.id !== id );
          setSports([...newlist]);
          if (body.length > maxStock) {
            setSportsStock([...sportsStock.filter(s => s.id !== stockId), { id: stockId, isMax: true }]);
          }
          localStorage.setItem("train-memo-data-sports", JSON.stringify(sports));
          localStorage.setItem("train-memo-data-stock", JSON.stringify(stock));
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("train-memo-token");
    setToken(token);
    fetchSportsData();
  }, []);

  return {
    sports,
    updateSport: updateSport,
    insertSport: insertSport,
    deleteData: deleteSport,
    token,
    updateToken
  };
};

export default useLocalStorage;

const covertSportToText = (value) => [
  "sports",
  value.name,
  value.dec,
  value.trainTime,
  value.relaxTime,
  value.round,
  value.type
    .map(({ id, useBothSide }) => `${id}=${useBothSide ? 1 : 0}`)
    .join(LIST_SPLIT),
  value.imgList
    .map(({ src, sha }) => [src, sha].join(IMAGE_SPLIT))
    .join(LIST_SPLIT)
];
const covertTextToSport = (id, textList) => {
  const [_, name, dec, trainTime, relaxTime, round, type, imgList] = textList;
  const types = (type ?? "").split(LIST_SPLIT).map((t) => ({
    id: t.split("=")[0],
    useBothSide: t.split("=")[1] == "1"
  }));
  types.forEach((t) => {
    const muscle = muscleList.find(({ id }) => id === t.id);
    if (muscle && !types.some((t) => t.id === muscle.body)) {
      types.push({ id: muscle.body, useBothSide: t.useBothSide });
    }
  });
  return {
    id,
    name,
    dec,
    trainTime: parseInt(trainTime),
    relaxTime: parseInt(relaxTime),
    round: parseInt(round),
    type: types,
    imgList: imgList
      ? imgList.split(LIST_SPLIT).map((i) => ({
          src: i.split(IMAGE_SPLIT)[0],
          sha: i.split(IMAGE_SPLIT)[1]
        }))
      : []
  };
};

export async function uploadSportList(data, token) {
  const octokit = new Octokit({
    auth: token
  });
  const content = btoa(unescape(encodeURIComponent(JSON.stringify(data))));

  const result = await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    message: "Update sports " + new Date().toLocaleString(),
    path: "assets/sports.txt",
    content,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28"
    }
  });
}
