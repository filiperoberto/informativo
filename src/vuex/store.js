import VuexPersistence from 'vuex-persist'
import { createStore } from 'vuex';
import state from './state'
import actions from './actions'
import mutations from './mutations'

const vuexLocal = new VuexPersistence({
  key: 'informativo-ibrvn',
  storage: window.localStorage
})

export const store = createStore({
  state,
  actions,
  mutations,
  plugins: [vuexLocal.plugin]
});
