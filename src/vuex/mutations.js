export default {
	openModalImage(state, value) {
		state.modalImage = {...value, ...{open: true}}
	},
	closeModalImage(state) {
		state.modalImage.reject && state.modalImage.reject()
		state.modalImage = {open: false}
	},
	selectModalImage(state, value) {
		state.modalImage.resolve && state.modalImage.resolve(value)
		state.modalImage = {open: false}
	},
	salvar(state, value) {
		state.salvo = value
	}
}