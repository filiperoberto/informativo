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
  }

}