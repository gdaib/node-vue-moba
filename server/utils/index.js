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





export const imageKeyMap = {
  'image/jpeg': '.jpg',
  'image/png': '.png'
}

export const uploadFile = (() => {
  const region = process.env.OSS_REGION
  const bucket = process.env.OSS_BUCKET
  const aliOSSclient = new AliOSS({
    region,
    bucket,
    accessKeyId: process.env.OSS_KEY,
    accessKeySecret: process.env.OSS_SECRET
  });
  const dir = process.env.OSS_DIR;

  return async (file) => {
    const key = imageKeyMap[file.mimetype];
    const fileName = `${Date.now().toString(16)}${key}`
    const path = `${dir}${fileName}`;
    await aliOSSclient.put(path, file.buffer)
    return `//${bucket}.${region}.aliyuncs.com/${path}`
  }
})()


