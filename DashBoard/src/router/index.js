import { createRouter, createWebHistory } from 'vue-router'
import loginVue from '@/views/loginVue.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'
import DoctorDashboard from '@/views/DoctorDashboard.vue'
import EmployeeDashboard from '@/views/EmployeeDashboard.vue'
import servVue from '@/views/servVue.vue'
import appointmentsVue from '@/views/appointmentsVue.vue'
import MangeDoctor from '@/views/MangeDoctor.vue'
import MangeEmployee from '@/views/MangeEmployee.vue'
import MangeOffers from '@/views/MangeOffers.vue'
import CustomerVue from '@/views/CustomerVue.vue'
import MangeAppointment from '@/views/MangeAppointment.vue'
import ListAppointment from '@/views/ListAppointment.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'loginVue', component: loginVue },
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: AdminDashboard,
      children: [
        { path: 'servVue', name: 'servVue', component: servVue },
        { path: 'MangeDoctor', name: 'MangeDoctor', component: MangeDoctor },
        { path: 'MangeEmployee', name: 'MangeEmployee', component: MangeEmployee },
        { path: 'MangeOffers', name: 'MangeOffers', component: MangeOffers }
      ]
    },
    {
      path: '/doctor',
      name: 'DoctorDashboard',
      component: DoctorDashboard,
      children: [
        {
          path: 'appointmentsVue',
          name: 'appointmentsVue',
          component: appointmentsVue
        },
        {
          path: 'CustomerVue',
          name: 'CustomerVue',
          component: CustomerVue
        }
      ]
    },
    {
      path: '/employee',
      name: 'EmployeeDashboard',
      component: EmployeeDashboard,
      children: [
        {
          path: 'MangeAppointment',
          name: 'MangeAppointment',
          component: MangeAppointment
        },
        {
          path: 'ListAppointment',
          name: 'ListAppointment',
          component: ListAppointment
        }
      ]
    }
  ]
})

export default router

// import { createRouter, createWebHistory } from 'vue-router'
// import loginVue from '@/views/loginVue.vue'
// import AdminDashboard from '@/views/AdminDashboard.vue'
// import DoctorDashboard from '@/views/DoctorDashboard.vue'
// import EmployeeDashboard from '@/views/EmployeeDashboard.vue'
// import servVue from '@/views/servVue.vue'
// import appointmentsVue from '@/views/appointmentsVue.vue'
// import MangeDoctor from '@/views/MangeDoctor.vue'
// import MangeEmployee from '@/views/MangeEmployee.vue'
// import MangeOffers from '@/views/MangeOffers.vue'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     { path: '/', name: 'loginVue', component: loginVue },
//     {
//       path: '/admin',
//       name: 'AdminDashboard',
//       component: AdminDashboard,
//       children: [
//         { path: '/servVue', name: 'servVue', component: servVue },
//         { path: '/MangeDoctor', name: 'MangeDoctor', component: MangeDoctor },
//         { path: '/MangeEmployee', name: 'MangeEmployee', component: MangeEmployee },
//         { path: '/MangeOffers', name: 'MangeOffers', component: MangeOffers }
//       ]
//     },
//     {
//       path: '/doctor',
//       name: 'DoctorDashboard',
//       component: DoctorDashboard,
//       children: [
//         {
//           path: '/appointmentsVue',
//           name: 'appointmentsVue',
//           component: appointmentsVue
//         }
//       ]
//     },
//     { path: '/employee', name: 'EmployeeDashboard', component: EmployeeDashboard }
//   ]
// })

// export default router
