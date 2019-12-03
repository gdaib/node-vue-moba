import axios from '@/http'

const prefix = '/api/v1'
const type = '/common'
const api = `${prefix}${type}`

export const upload = form => axios.post(`${api}/upload`, form)

