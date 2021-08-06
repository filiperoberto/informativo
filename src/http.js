import axios from 'axios'

const http = axios.create({
  baseURL: process.env.VUE_APP_ENDERECO_PHP,
  timeout: 15000
})

// Add a request interceptor
http.interceptors.request.use(config => {
  config.headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Accept': '*/*'
  }
  // Do something before request is sent
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})


http.interceptors.response.use(undefined, err => {
  return new Promise(() => {
    if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {

      localStorage.removeItem('token')
      window.location.href = '/login'
      return;
    }
    throw err;
  });
});

export default http
