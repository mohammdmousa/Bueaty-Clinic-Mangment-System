export default {
  state: {
    patients: []
  },
  mutations: {
    addpatients(state, patient) {
      state.patients.push(patient)
    },
    setpatients(state, patient) {
      state.patients = patient
      console.log(patient)
    },

    deletepatient(state, patientId) {
      state.patients = state.patients.filter((patient) => patient.id !== patientId)
    },
    updatepatient(state, updatepatient) {
      const index = state.patients.findIndex((patient) => patient.id === updatepatient.id)
      if (index !== -1) {
        state.patients.splice(index, 1, updatepatient)
      }
    }
  },
  actions: {
    async fetchpatient(context) {
      const token = localStorage.getItem('aouth_token')
      await fetch('http://localhost:8000/api/doctor/my_patients', {
        method: 'post',
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => response.json())
        .then((data) => {
          context.commit('setpatients', data.patients)
          console.log(data.patients[0].name)
        })
    },
    async addpatient(context, { name, service_name, location, phone }) {
      const token = localStorage.getItem('aouth_token')
      try {
        const response = await fetch('http://localhost:8000/api/doctor/add_patient', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ name, service_name, location, phone })
        })

        if (!response.ok) {
          const errorResponse = await response.text()
          console.error('Network response was not ok:', errorResponse)
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        context.commit('addpatients', data)
        console.log('patient added:', data)
      } catch (error) {
        console.error('Add patient failed:', error)
      }
    },
    async deletepatient(context, id) {
      const token = localStorage.getItem('aouth_token')
      try {
        const response = await fetch('http://localhost:8000/api/doctor/delete_patient', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ id: id })
        })

        if (!response.ok) {
          const errorResponse = await response.text()
          console.error('Network response was not ok:', errorResponse)
          throw new Error('Network response was not ok')
        }

        context.commit('deletepatient', id)
        console.log('patient deleted:', id)
      } catch (error) {
        console.error('Delete patient failed:', error)
      }
    },
    async updatepatient(context, { id, name, service_name, location, phone }) {
      const token = localStorage.getItem('aouth_token')
      try {
        const response = await fetch('http://localhost:8000/api/doctor/update_patient', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ id, name, service_name, location, phone })
        })

        if (!response.ok) {
          const errorResponse = await response.text()
          console.error('Network response was not ok:', errorResponse)
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        context.commit('updatepatient', data)
        console.log('patient updated:', data)
      } catch (error) {
        console.error('updated patient failed:', error)
      }
    },

    async search({ commit }, name) {
      console.log('searching...')
      const token = localStorage.getItem('aouth_token')
      try {
        const response = await fetch('http://localhost:8000/api/doctor/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ name: name })
        })

        if (!response.ok) {
          const errorResponse = await response.text()
          console.error('Network response was not ok:', errorResponse)
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        commit('setpatients', data.patients)
        console.log('patients updated:', data)
      } catch (error) {
        console.error('Search failed:', error)
      }
    }
  }
}
