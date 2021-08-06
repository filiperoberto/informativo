import { login } from '@/services/service'
export default {
  openSelectImage({commit}, {dir, selected}) {
    return new Promise((resolve, reject) => {
      commit('openModalImage', { dir, selected, resolve, reject })
    })
  },
  closeSelectImage({commit}) {
    commit('closeModalImage')
  },
  selectModalImage({commit}, value) {
    commit('selectModalImage', value)
  },
  salvar({commit}, value) {
    commit('salvar', value)
  },
  login({commit},data) {
    return login(data).then(({data}) => {
      localStorage.setItem('token', data.token)
      commit('token', data.token)
    })
  }

}