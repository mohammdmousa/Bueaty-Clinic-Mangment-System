export default {
  state: {
    doctors: [],
    appointments: [],
    appointments_docotr: [],
    servicess: [],
    errors: []
  },
  mutations: {
    setDoctor(state, doctor) {
      state.doctors = doctor
      console.log(doctor)
    },
    setappointments(state, appointments) {
      state.appointments = appointments
      console.log(appointments)
    },
    setservices(state, services) {
      state.servicess = services
      console.log(services)
    },
    addappointment(state, appointment) {
      state.appointments.push(appointment)
    },
    adderrores(state, error) {
      state.errors.push(error)
    },
    addappointment_doctor(state, appointment_docotr) {
      state.appointments_docotr.push(appointment_docotr)
    },
    deleteappointment(state, appointmentid) {
      state.appointments = state.appointments.filter(
        (appointment) => appointment.id !== appointmentid
      )
    },
    deleteappointment_doctor(state, appointmentid) {
      state.appointments_docotr = state.appointments_docotr.filter(
        (appointment) => appointment.id !== appointmentid
      )
    },
    updateappoint(state, updateappointment) {
      const index = state.appointments.findIndex(
        (appointment) => appointment.id === updateappointment.id
      )
      if (index !== -1) {
        state.appointments.splice(index, 1, updateappointment)
      }
    },
    updateappoint_doctor(state, updateappoint_doctor) {
      const index = state.appointments_docotr.findIndex(
        (appointment) => appointment.id === updateappoint_doctor.id
      )
      if (index !== -1) {
        state.appointments_docotr.splice(index, 1, updateappoint_doctor)
      }
    }
  },
  actions: {
    async fetchDoctorr(context) {
      const token = localStorage.getItem('aouth_token')
      await fetch('http://localhost:8000/api/secrtary/doctors', {
        method: 'post',
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => response.json())
        .then((data) => {
          context.commit('setDoctor', data.doctors)
          console.log(data.doctors[0].name)
        })
    },

    async fetchAppointments(context, { id, date }) {
      const token = localStorage.getItem('aouth_token')
      if (!token) {
        console.error('No auth token found')
        return
      }

      const requestBody = { id, date }

      console.log('Request Body for fetchAppointments:', requestBody)

      const response = await fetch('http://localhost:8000/api/secrtary/doctor_appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        console.error('Failed to fetch appointments:', response.statusText)
        return
      }

      const data = await response.json()
      console.log('Fetched appointments:', data)
      // You can handle the fetched appointments here if needed
    },
    async fetchservicess(context) {
      const token = localStorage.getItem('aouth_token')
      await fetch('http://localhost:8000/api/secrtary/services', {
        method: 'post',
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => response.json())
        .then((data) => {
          context.commit('setservices', data.services)
          console.log(data.services[0].name)
        })
    },
    async addappointment(context, { id, name, date, fromtime, totime, servicename }) {
      const token = localStorage.getItem('aouth_token')
      try {
        const response = await fetch('http://localhost:8000/api/secrtary/reserve_appointment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ id, name, date, fromtime, totime, servicename })
        })

        if (!response.ok) {
          const errorResponse = await response.json()
          context.commit('adderrores', JSON.parse(errorResponse))
          console.error('Network response was not ok:', errorResponse)
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        context.commit('addappointment', data)
        console.log('appointment added:', data)
      } catch (error) {
        console.error('Add appointment failed:', error)
      }
    },
    async deleteAppointment(context, appointmentid) {
      const token = localStorage.getItem('aouth_token')
      try {
        const response = await fetch('http://localhost:8000/api/secrtary/delete_appointment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ id: appointmentid })
        })

        if (!response.ok) {
          const errorResponse = await response.text()
          console.error('Network response was not ok:', errorResponse)
          throw new Error('Network response was not ok')
        }

        context.commit('deleteappointment', appointmentid)
        console.log('appointment deleted:', appointmentid)
      } catch (error) {
        console.error('Delete appointment failed:', error)
      }
    },
    async deleteAppointment_doctor(context, appointmentid) {
      const token = localStorage.getItem('aouth_token')
      try {
        const response = await fetch('http://localhost:8000/api/doctor/delete_appointment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ id: appointmentid })
        })

        if (!response.ok) {
          const errorResponse = await response.text()
          console.error('Network response was not ok:', errorResponse)
          throw new Error('Network response was not ok')
        }

        context.commit('deleteappointment_doctor', appointmentid)
        console.log('appointment deleted:', appointmentid)
      } catch (error) {
        console.error('Delete appointment failed:', error)
      }
    },
    async addappointment_doctor(context, { id, date, fromtime, totime, servicename }) {
      const token = localStorage.getItem('aouth_token')
      try {
        const response = await fetch('http://localhost:8000/api/doctor/reserve_appointment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ id, date, fromtime, totime, servicename })
        })

        if (!response.ok) {
          const errorResponse = await response.text()
          console.error('Network response was not ok:', errorResponse)
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        context.commit('addappointment_doctor', data)
        console.log('appointment added:', data)
      } catch (error) {
        console.error('Add appointment failed:', error)
      }
    },

    async updateappointment(context, { id, name, date, fromtime, totime, servicename }) {
      const token = localStorage.getItem('aouth_token')
      try {
        const response = await fetch(`http://localhost:8000/api/secrtary/update_appointment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ id, name, date, fromtime, totime, servicename })
        })

        if (!response.ok) {
          const errorResponse = await response.json()
          context.commit('adderrores', JSON.parse(errorResponse))
          console.error('Network response was not ok:', errorResponse)
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        context.commit('updateappoint', data)
        console.log('appointment updated:', data)
      } catch (error) {
        console.error('offer appointment failed:', error)
      }
    },
    async updateappointment_doctor(context, { id, date, fromtime, totime, servicename }) {
      const token = localStorage.getItem('aouth_token')
      try {
        const response = await fetch(`http://localhost:8000/api/doctor/update_appointment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ id, date, fromtime, totime, servicename })
        })

        if (!response.ok) {
          const errorResponse = await response.text()
          console.error('Network response was not ok:', errorResponse)
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        context.commit('updateappoint_doctor', data)
        console.log('appointment updated:', data)
      } catch (error) {
        console.error('offer appointment failed:', error)
      }
    }
  }
}
