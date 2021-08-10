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

export const load = (edicao = null) => {
  return http.get(`/json.php?edicao=${edicao}`)
}

export const loadGeneral = () => {
  return http.get(`/json.php`)
}

export const envios = (limit, offset) => {
  return http.get(`envios.php?limit=${limit}&offset=${offset}`)
}

export const enfileirar = numero => {
  return http.get(`enfileirar_auth.php?edicao=${numero}`)
}