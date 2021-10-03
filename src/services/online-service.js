import http from '@/http-online'

export const events = () => {
  console.log('aaaa')
  return http.get('/events/informativo')
}