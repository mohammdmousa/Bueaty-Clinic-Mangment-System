import { createStore } from 'vuex'
import admin from './modules/admin'
import doctor from './modules/doctor'
import employee from './modules/employee'
import services from './modules/services'
import offers from './modules/offers'
import appointment from './modules/appointment'
import patient from './modules/patient'
import recorde from './modules/recorde'

export default createStore({
  modules: {
    admin,
    doctor,
    employee,
    services,
    offers,
    appointment,
    patient,
    recorde
  }
})
