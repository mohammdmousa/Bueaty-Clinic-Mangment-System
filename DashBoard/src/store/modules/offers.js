export default {
  state: {
    offerss: []
  },
  mutations: {
    setoffers(state, offers) {
      state.offerss = offers
      console.log(offers)
    },

    addoffer(state, offer) {
      state.offerss.push(offer)
    },
    removeoffer(state, offerId) {
      state.offerss = state.offerss.filter((offer) => offer.id !== offerId)
    },
    updateoffer(state, updateoffer) {
      const index = state.offerss.findIndex((offer) => offer.id === updateoffer.id)
      if (index !== -1) {
        state.offerss.splice(index, 1, updateoffer)
      }
    }
  },
  actions: {
    async fetchoffers(context) {
      const token = localStorage.getItem('aouth_token')
      await fetch('http://localhost:8000/api/admin/offers', {
        method: 'post',
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => response.json())
        .then((data) => {
          context.commit('setoffers', data.offers)
          console.log(data.offers[0].name)
        })
    },

    /////////////////////////////////////
    async addoffer(context, { name, description }) {
      const token = localStorage.getItem('aouth_token')
      try {
        const response = await fetch('http://localhost:8000/api/admin/add_offer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ name, description })
        })

        if (!response.ok) {
          const errorResponse = await response.text()
          console.error('Network response was not ok:', errorResponse)
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        context.commit('addoffer', data)
        console.log('offer added:', data)
      } catch (error) {
        console.error('Add offer failed:', error)
      }
    },
    ///////////////////////////////////////
    async deleteoffer(context, offerId) {
      const token = localStorage.getItem('aouth_token')
      try {
        const response = await fetch('http://localhost:8000/api/admin/delete_offer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ id: offerId })
        })

        if (!response.ok) {
          const errorResponse = await response.text()
          console.error('Network response was not ok:', errorResponse)
          throw new Error('Network response was not ok')
        }

        context.commit('removeoffer', offerId)
        console.log('offer deleted:', offerId)
      } catch (error) {
        console.error('Delete offer failed:', error)
      }
    },
    ///////////////////////
    async updateoffer(context, { id, name, description }) {
      const token = localStorage.getItem('aouth_token')
      try {
        const response = await fetch(`http://localhost:8000/api/admin/update_offer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ name, description, id })
        })

        if (!response.ok) {
          const errorResponse = await response.text()
          console.error('Network response was not ok:', errorResponse)
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        context.commit('updateoffer', data)
        console.log('offer updated:', data)
      } catch (error) {
        console.error('offer updated failed:', error)
      }
    }
  }
}
