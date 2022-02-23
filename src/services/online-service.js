import http from '@/http-online'

export const events = () => {
  return http.get('/events/informativo')
}