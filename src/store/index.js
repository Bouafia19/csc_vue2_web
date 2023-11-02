import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import users from './modules/users'
import vehicles from './modules/vehicles'
import services from './modules/services'
import terms from './modules/terms'
import announcements from './modules/announcements'
import notifications from './modules/notifications'
import billings from './modules/billings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    users,
    vehicles,
    services,
    terms,
    announcements,
    notifications,
    billings
  }
})