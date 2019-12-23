import axios from "@/http";

const prefix = "/api/v1/admin",
  apiType = "/rest/ad",
  api = `${prefix}${apiType}`;

export const createAd = params => axios.post(api, params);

export const getAd = id => axios.get(`${api}/${id}`);

export const saveAd = ({ id, ...params }) => axios.put(`${api}/${id}`, params);
