require("dotenv").config();
import jwt from "jsonwebtoken";
import AliOSS from "ali-oss";
import config from "../config";

export function convertListToTree(list) {
  const map = {},
    data = [];

  list.forEach(item => {
    map[item._id] = item;
  });

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const parent = item.parent;

    if (!parent) {
      data.push(item);
    } else {
      const realParent = map[parent._id];
      realParent.children = (realParent.children || []).concat(item);
    }
  }

  // console.log(data, 'hello world');

  return data;
}

const getFileType = fileName => fileName.replace(/(.*)\./, ".");

export const uploadFile = (() => {
  const region = process.env.OSS_REGION;
  const bucket = process.env.OSS_BUCKET;
  const aliOSSclient = new AliOSS({
    region,
    bucket,
    accessKeyId: process.env.OSS_KEY,
    accessKeySecret: process.env.OSS_SECRET
  });
  const dir = process.env.OSS_DIR;

  return async file => {
    const key = getFileType(file.originalname);
    const fileName = `${Date.now().toString(16)}${key}`;
    const path = `${dir}${fileName}`;

    await aliOSSclient.put(path, file.buffer);
    return `//${bucket}.${region}.aliyuncs.com/${path}`;
  };
})();

export const jwtSign = data => {
  return jwt.sign(data, config.app_secret, {
    expiresIn: "1h"
  });
};
