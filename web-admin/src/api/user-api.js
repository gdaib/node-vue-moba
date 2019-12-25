import axios from "@/http";

const prefix = "/api/v1/admin",
  apiType = "/user",
  api = `${prefix}${apiType}`;

export const login = params => axios.post(`${api}/login`, params);
