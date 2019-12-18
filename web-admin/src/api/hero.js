import axios from "@/http";

const prefix = "/api/v1/admin";
const apiType = "/rest/hero";

const api = `${prefix}${apiType}`;

export const heroApi = api;

// 创建英雄
export const createHero = params => axios.post(api, params);

export const getHero = id => axios.get(`${api}/${id}`);

export const putHero = ({ id, ...params }) => axios.put(`${api}/${id}`, params);
