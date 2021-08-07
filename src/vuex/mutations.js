export default {
	openModalImage(state, value) {
		state.modalImage = { ...value, ...{ open: true } }
	},
	closeModalImage(state) {
		state.modalImage.reject && state.modalImage.reject()
		state.modalImage = { open: false }
	},
	selectModalImage(state, value) {
		state.modalImage.resolve && state.modalImage.resolve(value)
		state.modalImage = { open: false }
	},
	salvar(state, value) {
		state.salvo = value
	},
	token(state, value) {
		state.token = value
	},
	toast(state, value) {
		state.toast = value
	},
  rota(state, value) {
    state.rota = value
  },
  geral(state, value) {
    state.geral = value
  },
  overlay(state, value) {
	state.overlay = value
  }
}