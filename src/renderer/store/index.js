import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import modules from './modules'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  getters,
  actions,
  plugins: [createPersistedState()],
  strict: process.env.NODE_ENV !== 'production'
})
