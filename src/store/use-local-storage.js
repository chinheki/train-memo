import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { IMAGE_SPLIT } from "./use-image-server";
import { Octokit } from "@octokit/rest";
import { owner, repo } from "./use-image-server";
import { v4 as uuidv4 } from "uuid";
import { muscleList } from "../pages/WeeklyTrain";
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
        const body = JSON.stringify(
          sportsList.map((s) => ({ ...s, stockId: undefined }))
        );
        return await axios
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
            return false;
          })
          .then((r) => {
            sports.push({ ...newSport, stockId });
            setSports([...sports]);
            if (body.length > maxStock) {
              setSportsStock([
                ...sportsStock.filter((s) => s.id !== stockId),
                { id: stockId, isMax: true }
              ]);
            }
            return true;
          });
      } else {
        const body = JSON.stringify([newSport]);
        return await axios
          .post(
            "https://api.github.com/repos/chinheki/train-memo/issues/3/comments",
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
            return false;
          })
          .then((r) => {
            sports.push({ ...newSport, stockId: r.data.id });
            setSports([...sports]);
            setSportsStock([
              ...sportsStock,
              { id: r.data.id, isMax: body.length > maxStock }
            ]);
            return true;
          });
      }
    },
    [sports, sportsStock, token]
  );

  const updateSport = useCallback(
    async (value) => {
      const stockId = value.stockId;
      const body = JSON.stringify(
        sports.map((s) =>
          s.id === value.id
            ? { ...value, stockId: undefined }
            : { ...s, stockId: undefined }
        )
      );
      return await axios
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
          return false;
        })
        .then((r) => {
          const newlist = sports.map((s) =>
            s.id === value.id ? { ...value } : s
          );
          setSports([...newlist]);
          if (body.length > maxStock) {
            setSportsStock([
              ...sportsStock.filter((s) => s.id !== stockId),
              { id: stockId, isMax: true }
            ]);
          }
          console.log("success update");
          return true;
        });
    },
    [sports, sportsStock, token]
  );
  const deleteSport = useCallback(
    async (stockId, id) => {
      const body = JSON.stringify(
        sports
          .filter((s) => s.id !== id)
          .map((s) => ({ ...s, stockId: undefined }))
      );
      if (body.length) {
        return await axios
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
            return false;
          })
          .then((r) => {
            const newlist = sports.filter((s) => s.id !== id);
            setSports([...newlist]);
            if (body.length > maxStock) {
              setSportsStock([
                ...sportsStock.filter((s) => s.id !== stockId),
                { id: stockId, isMax: true }
              ]);
            }
            return true;
          });
      } else {
        return await axios
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
            const newlist = sports.filter((s) => s.id !== id);
            setSports([...newlist]);
            if (body.length > maxStock) {
              setSportsStock([
                ...sportsStock.filter((s) => s.id !== stockId),
                { id: stockId, isMax: true }
              ]);
            }
            return true;
          })
          .catch((e) => {
            console.log(e);
            return false;
          });
      }
    },
    [sports, sportsStock, token]
  );
  useEffect(() => {
    const token = localStorage.getItem("train-memo-token");
    setToken(token);
    fetchSportsData();
  }, []);
  useEffect(() => {
    sports.length &&
      localStorage.setItem("train-memo-data-sports", JSON.stringify(sports));
    sportsStock.length &&
      localStorage.setItem(
        "train-memo-data-stock",
        JSON.stringify(sportsStock)
      );
  }, [sports, sportsStock]);
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
