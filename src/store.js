import Vue from 'vue'
import Vuex from 'vuex'
import AccountStore from './modules/account/AccountStore'
import MapStore from './modules/map/MapStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    account: AccountStore,
    map: MapStore,
  },
})
