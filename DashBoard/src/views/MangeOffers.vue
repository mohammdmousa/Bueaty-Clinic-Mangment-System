<template>
  <div class="service p-10 w-full grid place-items-center bg-gray-200">
    <h2 class="text-[#085f63] pb-12 text-3xl font-bold">Offer Management</h2>
    <button
      class="bg-[#085f63] w-full text-white py-3 mb-10 rounded-full shadow-lg hover:bg-[#064f50] transition"
      @click="showAddOffersform = true"
    >
      <i class="fas fa-user-plus mr-2"></i> Add Offer
    </button>

    <div v-if="showAddOffersform" class="form-container w-full bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-center font-bold text-[#085f63] text-xl mb-4">Add New Offer</h3>
      <form @submit.prevent="addOffer">
        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">Offer</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="name"
            required
          />
        </div>

        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">description</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="about"
            required
          />
        </div>
        <div class="flex justify-between mb-3 gap-x-5">
          <button
            class="bg-[#f1345d] text-white py-2 px-5 rounded-full font-extrabold shadow-md hover:bg-[#d12d51] transition"
            type="submit"
          >
            ADD
          </button>
          <button
            class="bg-gray-400 text-white py-2 px-5 rounded-full font-extrabold shadow-md hover:bg-gray-500 transition"
            type="button"
            @click="showAddOffersform = false"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

    <div class="card shadow mb-4 mt-10 w-full text-center">
      <div class="card-header py-6 bg-[#085f63] text-white rounded-t-lg">
        <h6 class="m-0 font-weight-bold text-2xl text-[#d12d51]">List Offer</h6>
      </div>
      <div class="card-body bg-white p-6 rounded-b-lg shadow-inner">
        <div class="table-responsive">
          <table class="table table-bordered w-full">
            <thead class="bg-[#085f63] text-white">
              <tr>
                <th class="py-2">Offer Name</th>
                <th class="py-2">Offer Description</th>
                <th class="py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="offe in this.$store.state.offers.offerss" :key="offe.id" class="border-b">
                <td class="py-2">{{ offe.name }}</td>
                <td class="py-2">{{ offe.description }}</td>

                <td class="py-2 flex justify-around">
                  <button
                    class="p-2 rounded-xl bg-[#085f63] text-white font-bold mr-2 shadow-md hover:bg-[#064f50] transition"
                    @click="editOffer(offe)"
                  >
                    <i class="fas fa-edit"></i> Update
                  </button>
                  <button
                    class="p-2 rounded-xl bg-[#f1345d] text-white font-bold shadow-md hover:bg-[#d12d51] transition"
                    @click="deleteOffer(offe.id)"
                  >
                    <i class="fas fa-trash-alt"></i> Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div
      v-if="showEditOffersform"
      class="form-container w-full bg-white p-6 rounded-lg shadow-md mt-10"
    >
      <h3 class="text-center font-bold text-[#085f63] text-xl mb-4">Update Offer</h3>
      <form @submit.prevent="updateOffer">
        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">Offer</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="currentOffer.name"
            required
          />
        </div>
        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">description</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="currentOffer.description"
            required
          />
        </div>
        <div class="flex justify-between mb-3 gap-x-5">
          <button
            class="bg-[#f1345d] text-white py-2 px-5 rounded-full font-extrabold shadow-md hover:bg-[#d12d51] transition"
            type="submit"
          >
            Save
          </button>
          <button
            class="bg-gray-400 text-white py-2 px-5 rounded-full font-extrabold shadow-md hover:bg-gray-500 transition"
            type="button"
            @click="showEditOffersform = false"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      src: '',
      name: '',
      about: '',
      Offers: [],

      currentOffer: {
        id: '',
        name: '',
        description: ''
      },
      showAddOffersform: false,
      showEditOffersform: false
    }
  },
  methods: {
    // addOffer() {
    //   // إضافة الخدمة الجديدة لقائمة الخدمات
    //   this.Offers.push({ ...this.newOffer, id: Date.now() })
    //   this.showAddOffersform = false
    //   this.resetNewOfferForm()
    // },
    addOffer() {
      this.$store
        .dispatch('addoffer', {
          name: this.name,
          description: this.about
        })
        .then(() => {
          this.showAddOffersform = false
          this.resetNewOffferForm()
          Swal.fire({
            title: 'Success',
            text: 'offer added successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          })
        })
        .catch((error) => {
          console.error('Error adding offer:', error)
        })
    },
    editOffer(Offer) {
      this.currentOffer = { ...Offer }
      this.showEditOffersform = true
    },
    // updateOffer() {
    //   const index = this.Offers.findIndex((Offer) => Offer.id === this.currentOffer.id)
    //   if (index !== -1) {
    //     this.Offers.splice(index, 1, this.currentOffer)
    //   }
    //   this.showEditOffersform = false
    //   this.currentOffer = null
    // },
    async updateOffer() {
      try {
        await this.$store.dispatch('updateoffer', this.currentOffer)

        this.currentOffer = { id: '', name: '', description: '' }
        this.showEditOffersform = false
        Swal.fire({
          title: 'Success',
          text: 'offer updated successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      } catch (error) {
        console.error('Error updating offer:', error)
      }
    },
    deleteOffer(OfferId) {
      this.$store.dispatch('deleteoffer', OfferId)
      Swal.fire({
        title: 'Success',
        text: 'offer deleted successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    },
    resetNewOffferForm() {
      this.name = ''
      this.about = ''
    }
  },
  created() {
    return this.$store.dispatch('fetchoffers')
  }
}
</script>

<style scoped>
.service-management {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.service-management h2 {
  text-align: center;
  color: #42b983;
}

.service-management table {
  width: 100%;
}
</style>
