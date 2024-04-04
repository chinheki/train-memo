import { useState, useEffect } from 'react';
import axios from 'axios'
const useLocalStorage = () => {
    const [data, setData] = useState(null);

    const fetchData = async () => {
        console.log(process.env.REACT_APP_ISSUE_TOKEN)
        axios
      .get("https://api.github.com/repos/chinheki/train-memo/issues/comments", {
        headers: {
              Accept: "application/vnd.github+json",
           Authorization:  {"access_token":process.env.REACT_APP_ISSUE_TOKEN, "scope":"repo,gist", "token_type":"bearer"},
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })
      .catch((e) => {
        // alert("get good list error");
        console.log(e);
      })
      .then((r) => {
          console.log(r);
          const data = {
              sports: [],
              works: [],
              status:[]
          }
          r.data.map((v) => {
              const obj = JSON.parse(r);
              if ("sports" in obj) {
                  data.sports.push(obj.sports)
              }
               if ("works" in obj) {
                  data.works.push(obj.works)
              }
               if ("status" in obj) {
                  data.status.push(obj.status)
              }
          })
          setData(data)
      });

    //     try {
    //          axios.post(
    //              "https://api.github.com/repos/chinheki/train-memo/issues/1/comments",
    //     {
    //       body: JSON.stringify(good),
    //     },
    //     {
    //       headers: {
    //         Accept: "application/vnd.github+json",
    //         Authorization: `Bearer ${process.env.REACT_APP_ISSUE_TOKEN}`,
    //         "X-GitHub-Api-Version": "2022-11-28",
    //       },
    //     }
    //   ).catch(e => {
    //     alert("save error");
    //     console.log(e);
    //   }).then(r => {
    //     setStartAdd(false)
    //     updateMyEquipments()
    //   });
            // let result = [];
            //     const response = await fetch(csvFilePath);
            //     const csvData = await response.text();
            //     const rows = csvData.split('\n');
            //     const headers = rows[0].split(',');

            //     for (let i = 1; i < rows.length; i++) {
            //         const row = rows[i].split(',');
            //         if (row.length === headers.length) {
            //             const obj = {};
            //             for (let j = 0; j < headers.length; j++) {
            //                 obj[headers[j]] = row[j];
            //             }
            //             result.push(obj);
            //         }
            //     }
// console.log(result)
            // setData(result);
    };
      const updateData = async (key,value) => {
             axios.post(
                 "https://api.github.com/repos/chinheki/train-memo/issues/comments",
        {
          body: JSON.stringify({[key]:value}),
        },
        {
          headers: {
            Accept: "application/vnd.github+json",
           Authorization:  {"access_token":process.env.REACT_APP_ISSUE_TOKEN, "scope":"repo,gist", "token_type":"bearer"},
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      ).catch(e => {
        alert("save error");
        console.log(e);
      }).then(r => {
      });
    };
    useEffect(() => {
            fetchData()

    }, []);

    return {data,updateData};
};

export default useLocalStorage;