export default {
  state: {
    recordes: []
  },
  mutations: {
    addrecorde(state, recorde) {
      state.recordes.push(recorde)
    },
    setpatients(state, patient) {
      state.patients = patient
      console.log(patient)
    },
    deletepatient(state, patientId) {
      state.patients = state.patients.filter((patient) => patient.id !== patientId)
    },
    deleterecorde(state, recordeId) {
      state.recordes = state.recordes.filter((recorde) => recorde.id !== recordeId)
    },
    updatepatient(state, updatepatient) {
      const index = state.patients.findIndex((patient) => patient.id === updatepatient.id)
      if (index !== -1) {
        state.patients.splice(index, 1, updatepatient)
      }
    },
    update_record(state, update_record) {
      const index = state.recordes.findIndex((recorde) => recorde.id === update_record.id)
      if (index !== -1) {
        state.recordes.splice(index, 1, update_record)
      }
    }
  },
  actions: {
    async fetchrecordes(context, { id }) {
      const token = localStorage.getItem('aouth_token')
      if (!token) {
        console.error('No auth token found')
        return
      }

      const requestBody = { id }

      console.log('Request Body for fetchrecorde:', requestBody)

      const response = await fetch('http://localhost:8000/api/doctor/patient_record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        console.error('Failed to fetch recordes:', response.statusText)
        return
      }

      const data = await response.json()
      console.log('Fetched recordes:', data)
      // You can handle the fetched appointments here if needed
    },
    async addrecordee(context, { patient_id, date, note, description }) {
      const token = localStorage.getItem('aouth_token')
      try {
        const response = await fetch('http://localhost:8000/api/doctor/add_record', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ patient_id, date, note, description })
        })

        if (!response.ok) {
          const errorResponse = await response.text()
          console.error('Network response was not ok:', errorResponse)
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        context.commit('addrecorde', data)
        console.log('recorde added:', data)
      } catch (error) {
        console.error('Add recorde failed:', error)
      }
    },
    async deleterecorde(context, id) {
      const token = localStorage.getItem('aouth_token')
      try {
        const response = await fetch('http://localhost:8000/api/doctor/delete_record', {
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

        context.commit('deleterecorde', id)
        console.log('recorde deleted:', id)
      } catch (error) {
        console.error('Delete recorde failed:', error)
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
    async update_record(context, { id, date, note, description }) {
      const token = localStorage.getItem('aouth_token')
      try {
        const response = await fetch('http://localhost:8000/api/doctor/update_record', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ id, date, note, description })
        })

        if (!response.ok) {
          const errorResponse = await response.text()
          console.error('Network response was not ok:', errorResponse)
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        context.commit('update_record', data)
        console.log('recorde updated:', data)
      } catch (error) {
        console.error('updated recorde failed:', error)
      }
    }
  }
}
