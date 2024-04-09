import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Octokit } from "@octokit/rest";
import { v4 as uuidv4 } from 'uuid';


export const owner = "chinheki";
export const repo = "image-server";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
  });

export async function uploadImage(files,token) {
    const octokit = new Octokit({
  auth: token,
});
    const fileList = [];
    console.log(files)
  for (let i = 0; i < files.length; i++) {
    const fileObj = files[i];
    if (fileObj.file) {
      const content = await toBase64(fileObj.file);
      if (content) {
        const result = await octokit.repos.createOrUpdateFileContents({
          owner,
          repo,
          message: "Adding an image",
          path: "assets/images/" + uuidv4() + fileObj.file.name.split(".")[1],
          content
        });
        fileList.push({ src: result.data.content.download_url, sha: result.data.content.sha });
      }
    } else if (fileObj.needDelete && fileObj.sha) {
      deleteImage(fileObj, token)
} else {
          fileList.push(fileObj)
          
      }
  }
  return fileList;
}
export async function deleteImage(file, token) {
  if (!file.sha) return;
    const octokit = new Octokit({
  auth: token,
});

          octokit.rest.repos.deleteFile({
  owner,
  repo,
  path,
  message: "delete useless image",
  sha:file.sha,
});

}
export const IMAGE_SPLIT=" _::_ "