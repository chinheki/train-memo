import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { IMAGE_SPLIT } from "./use-image-server";
import { Octokit } from "@octokit/rest";
import { owner, repo } from "./use-image-server";
import { v4 as uuidv4 } from "uuid";
const SPLIT = "$$$";
const LIST_SPLIT = ",";
const useLocalStorage = () => {
  const [token, setToken] = useState(null);
  const [data, setData] = useState({
    sports: [],
    works: [],
    status: []
  });

  const updateToken = (v) => {
    localStorage.setItem("train-memo-token", v);
    setToken(v);
  };
  const fetchData = async () => {
    axios
      .get(
        "https://api.github.com/repos/chinheki/train-memo/issues/comments?per_page=100",
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
      .catch((e) => {
        // alert("get good list error");
        console.log(e);
      })
      .then((r) => {
        const data = {
          sports: [],
          works: [],
          status: []
        };
        r.data.map(({ id, body }) => {
          const obj = body.split(SPLIT);
          if ("sports" === obj[0]) {
            data.sports.push(covertTextToSport(id, obj));
          }
          if ("works" === obj[0]) {
            data.works.push(obj.works);
          }
          if ("status" === obj[0]) {
            data.status.push(obj.status);
          }
        });
        setData(data);
        // uploadSportList(data.sports, token);
      });
  };
  const insertData = useCallback(
    async (key, value) => {
      const text =
        key === "sports"
          ? covertSportToText(value)
          : key === "works"
          ? [
              "works",
              value.name,
              value.dec,
              value.trainTime,
              value.relaxTime,
              value.round
            ]
          : [
              "status",
              value.name,
              value.dec,
              value.trainTime,
              value.relaxTime,
              value.round
            ];
      axios
        .post(
          "https://api.github.com/repos/chinheki/train-memo/issues/1/comments",
          {
            body: text.join(SPLIT)
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
          data[key].push({ ...value, id: r.data.id });
          setData({ ...data });
        });
    },
    [data]
  );

  const updateData = async (key, value) => {
    const text =
      key === "sports"
        ? covertSportToText(value)
        : key === "works"
        ? [
            "works",
            value.name,
            value.dec,
            value.trainTime,
            value.relaxTime,
            value.round
          ]
        : [
            "status",
            value.name,
            value.dec,
            value.trainTime,
            value.relaxTime,
            value.round
          ];
    axios
      .post(
        "https://api.github.com/repos/chinheki/train-memo/issues/comments/" +
          value.id,
        {
          body: text.join(SPLIT)
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
        const updatedData = data[key].map((item) => {
          if (item.id === value.id) {
            return { ...value };
          }
          return item;
        });
        setData({ ...data, [key]: [...updatedData] });
      });
  };
  const deleteData = async (key, id) => {
    axios
      .delete(
        "https://api.github.com/repos/chinheki/train-memo/issues/comments/" +
          id,
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${token}`,
            "X-GitHub-Api-Version": "2022-11-28"
          }
        }
      )

      .then((r) => {
        console.log(r);
        if (r.status === 204) {
          const updatedData = data[key].filter((item) => item.id !== id);
          setData({ ...data, [key]: updatedData });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    const token = localStorage.getItem("train-memo-token");
    setToken(token);
    fetchData();
  }, []);

  return { data, updateData, insertData, deleteData, token, updateToken };
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
  return {
    id,
    name,
    dec,
    trainTime: parseInt(trainTime),
    relaxTime: parseInt(relaxTime),
    round: parseInt(round),
    type: (type ?? "").split(LIST_SPLIT).map((t) => ({
      id: t.split("=")[0],
      useBothSide: t.split("=")[1] == "1"
    })),
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
