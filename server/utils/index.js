require("dotenv").config();
import AliOSS from "ali-oss";

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

const aliOSSclient = new AliOSS({
  region: process.env.OSS_REGION,
  bucket: process.env.OSS_BUCKET,
  accessKeyId: process.env.OSS_KEY,
  accessKeySecret: process.env.OSS_SECRET
});

const dir = process.env.OSS_DIR;

export const uploadFile = ({ filename, file }) =>
  aliOSSclient.multipartUpload(`${dir}/${filename}`, file);
