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
      commit('token', data.token)
    })
  },
  logout({commit}) {
    commit('token', null)
  },
  alert({commit},value) {
    commit('toast', value)
  },
  navigate({commit}, value) {
    commit('rota', value)
  },
  salvarGeral({commit}, value) {
    commit('geral', value)
  },
  overlay({commit}, value) {
    commit('overlay', value)
  },
  dev({commit}, value) {
    commit('dev', value)
  }

}