import axios from 'axios'
import { store } from '@/vuex/store'

const http = axios.create({
  baseURL: process.env.VUE_APP_ENDERECO_PHP,
  timeout: 15000
})

// Add a request interceptor
http.interceptors.request.use(config => {
  config.headers = {
    'Authorization': `Bearer ${store.state.token}`,
    'Accept': '*/*'
  }
  // Do something before request is sent
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})


http.interceptors.response.use(undefined, err => {
  return new Promise((resolve, reject) => {
    if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
      store.state.token = null
      return reject({});
    }
    throw err;
  });
});

export default http
