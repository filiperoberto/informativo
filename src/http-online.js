import axios from 'axios'

const http = axios.create({
  baseURL: process.env.VUE_APP_ENDERECO_ONLINE
})

export default http
