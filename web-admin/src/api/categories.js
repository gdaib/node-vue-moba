import axios from '@/http'

const prefix = '/admin/api/v1'
const apiType = '/rest/categories'

const api = `${prefix}${apiType}`

export const getCategoriesTree = () => axios.get(`${api}/tree`)

export const getCategoriesTree2 = () => axios.get(`${api}/tree`)
