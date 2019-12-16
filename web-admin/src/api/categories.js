import axios from "@/http";

const prefix = "/api/v1/admin",
  apiType = "/rest/categories",

  api = `${prefix}${apiType}`;

// 创建分类
export const createCategory = params => axios.post(`${api}`, params);

// 删除分类
export const removeCategory = id => axios.delete(`${api}/${id}`);

// 编辑分类
export const putCategory = ({ id, ...params }) =>
  axios.put(`${api}/${id}`, params);

// 获取分类树
export const getCategoriesTree = () => axios.get(`${api}/tree`);

// 获取分类
export const getCategories = () => axios.get(`${api}`)

// 树排序
export const handleCategoriesSort = data => axios.post(`${api}/sort`, data);
