import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'

const instance = axios.create({
  timeout: 5000 // request timeout
})

export default instance
