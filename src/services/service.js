import http from '@/http'

export const login = ({username, password}) => {
  const auth = {
    username,
    password
  }
  return http.post('/login.php', {}, {auth})
}

export const imagens = dir => {
  return http.get(`/imagens.php?dir=${dir}`)
}

export const upload = (data, overwrite) => {
  return http.post(`/upload.php?overwrite=${overwrite}`,data, {
    headers: { "Content-Type": "multipart/form-data" }
  })
}