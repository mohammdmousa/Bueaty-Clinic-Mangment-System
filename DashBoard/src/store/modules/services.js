export default {
  state: {
    servicess: []
  },
  mutations: {
    setservices(state, services) {
      state.servicess = services
      console.log(services)
    },
    addService(state, service) {
      state.servicess.push(service)
    },
    deleteservice(state, serviceId) {
      state.servicess = state.servicess.filter((service) => service.id !== serviceId)
    },
    updateservice(state, updateservice) {
      const index = state.servicess.findIndex((service) => service.id === updateservice.id)
      if (index !== -1) {
        state.servicess.splice(index, 1, updateservice)
      }
    }
  },
  actions: {
    async fetchservices(context) {
      const token = localStorage.getItem('aouth_token')
      await fetch('http://localhost:8000/api/admin/services', {
        method: 'post',
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => response.json())
        .then((data) => {
          context.commit('setservices', data.services)
          console.log(data.services[0].name)
        })
    },
    async addservice(context, { name, description, doctor_id }) {
      const token = localStorage.getItem('aouth_token')
      try {
        const response = await fetch('http://localhost:8000/api/admin/add_service', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ name, description, doctor_id })
        })

        if (!response.ok) {
          const errorResponse = await response.text()
          console.error('Network response was not ok:', errorResponse)
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        context.commit('addService', data)
        console.log('service added:', data)
      } catch (error) {
        console.error('Add service failed:', error)
      }
    },
    async deleteservice(context, serviceId) {
      const token = localStorage.getItem('aouth_token')
      try {
        const response = await fetch('http://localhost:8000/api/admin/delete_service', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ id: serviceId })
        })

        if (!response.ok) {
          const errorResponse = await response.text()
          console.error('Network response was not ok:', errorResponse)
          throw new Error('Network response was not ok')
        }

        context.commit('deleteservice', serviceId)
        console.log('service deleted:', serviceId)
      } catch (error) {
        console.error('Delete service failed:', error)
      }
    },
    async updateservice(context, { id, name, description, doctor_id }) {
      const token = localStorage.getItem('aouth_token')
      try {
        const response = await fetch(`http://localhost:8000/api/admin/update_service`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ id, name, description, doctor_id })
        })

        if (!response.ok) {
          const errorResponse = await response.text()
          console.error('Network response was not ok:', errorResponse)
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        context.commit('updateservice', data)
        console.log('service updated:', data)
      } catch (error) {
        console.error('Update service failed:', error)
      }
    }
  }
}
