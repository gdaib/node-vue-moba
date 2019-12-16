import axios from "@/http";

const prefix = "/api/v1/admin";
const apiType = "/rest/item";

const api = `${prefix}${apiType}`;

// 创建装备列表
export const getItems = () => axios.get(`${api}`)
