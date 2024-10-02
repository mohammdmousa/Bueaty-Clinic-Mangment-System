// import { data } from 'autoprefixer'

export default {
//   state: {
//     m: '',
//     doctor: ''
//   },

//   mutations: {
//     setEmployee(state, m) {
//       state.m = m
//       console.log(m)
//     },
//     setDoctor(state, doctor) {
//       state.doctor = doctor
//       console.log(doctor)
//     }
//   },
//   actions: {
    //     async fetchEmployee(context) {
    //       const token = localStorage.getItem('aouth_token')
    //       await fetch('http://localhost:8000/api/admin/secrtaries', {
    //         method: 'post',
    //         headers: { Authorization: `Bearer ${token}` }
    //       })
    //         .then((response) => response.json())
    //         .then((data) => {
    //           context.commit('setEmployee', data.secrtaries[0])
    //           console.log(data.secrtaries[0].name)
    //         })
    //     }
    //   },
//     async fetchEmployee(context) {
//       const token = localStorage.getItem('aouth_token')
//       if (!token) {
//         console.error('Token is missing')
//         return
//       }

//       try {
//         const response = await fetch('http://localhost:8000/api/admin/secrtaries', {
//           method: 'POST',
//           headers: { Authorization: `Bearer ${token}` }
//         })

//         if (!response.ok) {
//           throw new Error('Network response was not ok')
//         }

//         const data = await response.json()
//         if (data && data.secrtaries && data.secrtaries.length > 0) {
//           context.commit('setEmployee', data.secrtaries[0])
//           console.log(data.secrtaries[0].name)
//         } else {
//           console.warn('No secrtaries found in the response')
//           context.commit('setEmployee', null)
//         }
//       } catch (error) {
//         console.error('Fetch employee failed:', error)
//       }
//     },
//     async fetchDoctor(context) {
//       const token = localStorage.getItem('aouth_token')
//       await fetch('http://localhost:8000/api/admin/doctors', {
//         method: 'post',
//         headers: { Authorization: `Bearer ${token}` }
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           context.commit('setDoctor', data.doctors[0])
//           console.log(data.doctors[0].name)
//         })
//     }
//   }
}
