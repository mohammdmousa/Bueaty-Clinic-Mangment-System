<template>
  <div class="service p-10 w-full grid place-items-center bg-gray-200">
    <h2 class="text-[#085f63] pb-12 text-3xl font-bold">Service Management</h2>
    <button
      class="bg-[#085f63] w-full text-white py-3 mb-10 rounded-full shadow-lg hover:bg-[#064f50] transition"
      @click="showAddServiceForm = true"
    >
      <i class="fas fa-user-plus mr-2"></i> Add Services
    </button>

    <div v-if="showAddServiceForm" class="form-container w-full bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-center font-bold text-[#085f63] text-xl mb-4">Add New Services</h3>
      <form @submit.prevent="addService">
        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">Services Name</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="name"
            required
          />
        </div>

        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">About Services</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="description"
            required
          />
        </div>
        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">Doctor Name</label>
          <select
            id="sel"
            v-model="doctor_id"
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            required
          >
            <option v-for="dox in this.$store.state.doctor.doctors" :key="dox.id" :value="dox.id">
              {{ dox.name }}
            </option>
          </select>
        </div>

        <div class="flex justify-between">
          <button
            class="bg-[#f1345d] text-white py-2 px-5 rounded-full font-extrabold shadow-md hover:bg-[#d12d51] transition"
            type="submit"
          >
            ADD
          </button>
          <button
            class="bg-gray-400 text-white py-2 px-5 rounded-full font-extrabold shadow-md hover:bg-gray-500 transition"
            type="button"
            @click="showAddServiceForm = false"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

    <div class="card shadow mb-4 mt-10 w-full text-center">
      <div class="card-header py-6 bg-[#085f63] text-white rounded-t-lg">
        <h6 class="m-0 font-weight-bold text-2xl text-[#d12d51]">List Services</h6>
      </div>
      <div class="card-body bg-white p-6 rounded-b-lg shadow-inner">
        <div class="table-responsive">
          <table class="table table-bordered w-full">
            <thead class="bg-[#085f63] text-white">
              <tr>
                <th class="py-2">Name Services</th>
                <th class="py-2">About</th>
                <!-- <th class="py-2">Price</th> -->
                <th class="py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="ser in this.$store.state.services.servicess"
                :key="ser.id"
                class="border-b"
              >
                <td class="py-2">{{ ser.name }}</td>
                <td class="py-2">{{ ser.description }}</td>

                <td class="py-2 flex justify-around">
                  <button
                    class="p-2 rounded-xl bg-[#085f63] text-white font-bold mr-2 shadow-md hover:bg-[#064f50] transition"
                    @click="editService(ser)"
                  >
                    <i class="fas fa-edit"></i> Update
                  </button>
                  <button
                    class="p-2 rounded-xl bg-[#f1345d] text-white font-bold shadow-md hover:bg-[#d12d51] transition"
                    @click="deleteService(ser.id)"
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
      v-if="showEditServiceForm"
      class="form-container w-full bg-white p-6 rounded-lg shadow-md mt-10"
    >
      <h3 class="text-center font-bold text-[#085f63] text-xl mb-4">Update Services</h3>
      <form @submit.prevent="updateService">
        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">Services Name</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="currentService.name"
            required
          />
        </div>

        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">About Services</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="currentService.description"
            required
          />
        </div>

        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">Doctor Specialty</label>
          <select
            id="sel"
            v-model="currentService.doctor_id"
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            required
          >
            <option v-for="dox in this.$store.state.doctor.doctors" :key="dox.id" :value="dox.id">
              {{ dox.name }}
            </option>
          </select>
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
            @click="showEditServiceForm = false"
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
      srcmounep: '',
      description: '',
      doctor_id: '',
      name: '',
      currentService: {
        id: '',
        name: '',
        description: '',
        doctor_id: ''
      },
      showAddServiceForm: false,
      showEditServiceForm: false
    }
  },
  methods: {
    addService() {
      console.log(this.doctor_id)
      this.$store
        .dispatch('addservice', {
          name: this.name,
          description: this.description,
          doctor_id: this.doctor_id
        })
        .then(() => {
          this.showAddServiceForm = false
          this.resetNewServiceForm()
          Swal.fire({
            title: 'Success',
            text: 'service added successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          })
        })
        .catch((error) => {
          console.error('Error adding service:', error)
        })
    },
    editService(service) {
      this.currentService = { ...service }
      this.showEditServiceForm = true
    },

    async updateService() {
      console.log(this.doctor_id)
      try {
        await this.$store.dispatch('updateservice', this.currentService)

        this.currentService = { id: '', name: '', description: '', doctor_id: '' }
        this.showEditServiceForm = false
        Swal.fire({
          title: 'Success',
          text: 'service updated successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      } catch (error) {
        console.error('Error updating doctor:', error)
      }
    },
    deleteService(serviceId) {
      this.$store.dispatch('deleteservice', serviceId)
      Swal.fire({
        title: 'Success',
        text: 'service deleted successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    },
    resetNewServiceForm() {
      this.name = ''
      this.description = ''
    }
  },
  created() {
    this.$store.dispatch('fetchDoctor')
    this.$store.dispatch('fetchservices')
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
