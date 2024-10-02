export default {
  state: {
    doctors: [],
    errors: [],
    errorss: []
  },
  mutations: {
    setDoctor(state, doctor) {
      state.doctors = doctor
      console.log(doctor)
    },
    addDoctor(state, doctor) {
      state.doctors.push(doctor)
    },
    removeDoctor(state, DoctorId) {
      state.doctors = state.doctors.filter((doctor) => doctor.id !== DoctorId)
    },
    updateDoctor(state, updateDoctor) {
      const index = state.doctors.findIndex((employee) => employee.id === updateDoctor.id)
      if (index !== -1) {
        state.doctors.splice(index, 1, updateDoctor)
        // state.doctors[index] = updateDoctor
      }
    },
    adderrores(state, error) {
      state.errors.push(error)
    },
    updateerrores(state, error) {
      state.errorss.push(error)
    }
  },
  actions: {
    async fetchDoctor(context) {
      const token = localStorage.getItem('aouth_token')
      await fetch('http://localhost:8000/api/admin/doctors', {
        method: 'post',
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => response.json())
        .then((data) => {
          context.commit('setDoctor', data.doctors)
          console.log(data.doctors[0].name)
        })
    },

    async addDoctor(context, { name, email, password }) {
      const token = localStorage.getItem('aouth_token')
      try {
        const response = await fetch('http://localhost:8000/api/admin/add_doctor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ name, email, password })
        })

        if (!response.ok) {
          const errorResponse = await response.json()
          context.commit('adderrores', JSON.parse(errorResponse))
          console.error('Network response was not ok:', errorResponse)
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        context.commit('addDoctor', data)
        console.log('Doctor added:', data)
      } catch (error) {
        console.error('Add Doctor failed:', error)
      }
    },
    async deleteDoctor(context, DoctorId) {
      const token = localStorage.getItem('aouth_token')
      try {
        const response = await fetch('http://localhost:8000/api/admin/delete_doctor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ id: DoctorId })
        })

        if (!response.ok) {
          const errorResponse = await response.text()
          console.error('Network response was not ok:', errorResponse)
          throw new Error('Network response was not ok')
        }

        context.commit('removeDoctor', DoctorId)
        console.log('Doctor deleted:', DoctorId)
      } catch (error) {
        console.error('Delete Doctor failed:', error)
      }
    },
    async updateDoctor(context, { id, name, email, password }) {
      const token = localStorage.getItem('aouth_token')
      try {
        const response = await fetch(`http://localhost:8000/api/admin/update_doctor`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ name, email, password, id })
        })

        if (!response.ok) {
          const errorResponse = await response.json()
          context.commit('updateerrores', JSON.parse(errorResponse))
          console.error('Network response was not ok:', errorResponse)
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        context.commit('updateDoctor', data)
        console.log('doctor updated:', data)
      } catch (error) {
        console.error('Update doctor failed:', error)
      }
    }
  }
}
