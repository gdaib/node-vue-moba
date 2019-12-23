import axios from "@/http";

const prefix = "/api/v1/admin",
  apiType = "/rest/article",
  api = `${prefix}${apiType}`;

export const createArticle = params => axios.post(api, params);

export const getArticle = id => axios.get(`${api}/${id}`);

export const saveArticle = ({id, ...params }) => axios.put(`${api}/${id}`, params)
