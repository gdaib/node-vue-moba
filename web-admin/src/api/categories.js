import axios from '@/http'

const prefix = '/admin/api/v1'
const apiType = '/rest/categories'

const api = `${prefix}${apiType}`

// 创建分类
export const createCategory = params => axios.post(`${api}`, params)

export const removeCategory = id => axios.delete(`${api}/${id}`)

export const getCategoriesTree = () => axios.get(`${api}/tree`)

export const getCategoriesTree2 = () => axios.get(`${api}/tree`)
