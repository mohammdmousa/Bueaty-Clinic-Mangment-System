<template>
  <div class="service p-10 w-full grid place-items-center bg-gray-200">
    <h2 class="text-[#085f63] pb-12 text-3xl font-bold">Doctor Management</h2>
    <button
      class="bg-[#085f63] w-full text-white py-3 mb-10 rounded-full shadow-lg hover:bg-[#064f50] transition"
      @click="showAddDoctorform = true"
    >
      <i class="fas fa-user-plus mr-2"></i>Add Doctor
    </button>
    <div v-if="showAddDoctorform" class="form-container w-full bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-center font-bold text-[#085f63] text-xl mb-4">Add New Doctor</h3>
      <form @submit.prevent="addDoctor">
        <div
          v-if="this.$store.state.doctor.errors.length > 0"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4"
        >
          <div class="flex">
            <div>
              <ul class="list-disc pl-6">
                <li v-for="er in this.$store.state.doctor.errors" :key="er.email">
                  <span v-if="er.email">{{ er.email.toString() }}</span>
                  <span v-if="er.password">{{ er.password.toString() }}</span>
                </li>
                <li
                  v-if="
                    this.$store.state.doctor.errors && this.$store.state.doctor.errors.length === 0
                  "
                >
                  No errors found.
                </li>
                <li v-if="!this.$store.state.doctor.errors">Error data is not available.</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">Doctor Name</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="name"
            required
          />
        </div>
        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">Doctor email</label>
          <input
            type="email"
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="email"
            required
          />
        </div>

        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">Doctor Password</label>
          <input
            type="password"
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="password"
            required
          />
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
            @click="showAddDoctorform = false"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

    <div class="card shadow mb-4 mt-10 w-full text-center">
      <div class="card-header py-6 bg-[#085f63] text-white rounded-t-lg">
        <h6 class="m-0 font-weight-bold text-2xl text-[#d12d51]">List of Doctors</h6>
      </div>
      <div class="card-body bg-white p-6 rounded-b-lg shadow-inner">
        <div class="table-responsive">
          <table class="table table-bordered w-full">
            <thead class="bg-[#085f63] text-white">
              <tr>
                <th class="py-2">Name Doctor</th>
                <th class="py-2">Email</th>
                <!-- <th class="py-2">Specialty</th> -->
                <th class="py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="dox in this.$store.state.doctor.doctors" :key="dox.id" class="border-b">
                <td class="py-2">{{ dox.name }}</td>
                <td class="py-2">{{ dox.email }}</td>
                <!-- <td class="py-2">{{}}</td> -->

                <td class="py-2 flex justify-around">
                  <button
                    class="p-2 rounded-xl bg-[#085f63] text-white font-bold mr-2 shadow-md hover:bg-[#064f50] transition"
                    @click="editDoctor(dox)"
                  >
                    <i class="fas fa-edit"></i>Update
                  </button>
                  <button
                    class="p-2 rounded-xl bg-[#f1345d] text-white font-bold shadow-md hover:bg-[#d12d51] transition"
                    @click="deleteDoctor(dox.id)"
                  >
                    <i class="fas fa-trash-alt"></i>Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div
      v-if="showEditDoctorform"
      class="form-container w-full bg-white p-6 rounded-lg shadow-md mt-10"
    >
      <h3 class="text-center font-bold text-[#085f63] text-xl mb-4">Update Doctor</h3>
      <form @submit.prevent="updateDoctor">
        <div
          v-if="this.$store.state.doctor.errorss.length > 0"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4"
        >
          <div class="flex">
            <div>
              <ul class="list-disc pl-6">
                <li v-for="er in this.$store.state.doctor.errorss" :key="er.email">
                  <span v-if="er.email">{{ er.email.toString() }}</span>
                  <span v-if="er.password">{{ er.password.toString() }}</span>
                </li>
                <li
                  v-if="this.$store.state.doctor.errorss && this.$store.state.doctor.errorss === 0"
                >
                  No errors found.
                </li>
                <li v-if="!this.$store.state.doctor.errorss">Error data is not available.</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">Doctor Name</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="currentDoctor.name"
            required
          />
        </div>
        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">Doctor email</label>
          <input
            type="email"
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="currentDoctor.email"
            required
          />
        </div>

        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">Doctor Password</label>
          <input
            type="password"
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="currentDoctor.password"
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
            @click="showEditDoctorform = false"
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
      name: '',
      password: '',
      email: '',
      Doctors: [],

      currentDoctor: {
        id: '',
        name: '',
        email: '',
        password: ''
      },
      // specialties: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'General Surgery'],
      showAddDoctorform: false,
      showEditDoctorform: false
    }
  },
  methods: {
    addDoctor() {
      this.$store
        .dispatch('addDoctor', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(() => {
          if (!this.$store.state.doctor.errors || this.$store.state.doctor.errors.length === 0) {
            this.showAddDoctorform = false

            this.resetNewDoctorForm()
            Swal.fire({
              title: 'Success',
              text: 'doctor added successfully!',
              icon: 'success',
              confirmButtonText: 'OK'
            })
          }
        })
        .catch((error) => {
          console.error('Error adding employee:', error)
        })
    },
    editDoctor(Doctor) {
      this.currentDoctor = { ...Doctor }
      this.showEditDoctorform = true
    },
    async updateDoctor() {
      try {
        await this.$store.dispatch('updateDoctor', this.currentDoctor).then(() => {
          if (!this.$store.state.doctor.errorss || this.$store.state.doctor.errorss.length === 0) {
            this.currentDoctor = { id: '', name: '', email: '', password: '' }
            this.showEditDoctorform = false
            Swal.fire({
              title: 'Success',
              text: 'doctor updated successfully!',
              icon: 'success',
              confirmButtonText: 'OK'
            })
          }
        })
      } catch (error) {
        console.error('Error updating doctor:', error)
      }
    },
    deleteDoctor(DoctorId) {
      this.$store.dispatch('deleteDoctor', DoctorId)
    },
    resetNewDoctorForm() {
      this.name = ''
      this.password = ''
      this.email = ''
    }
  },
  created() {
    return this.$store.dispatch('fetchDoctor')
  }
}
</script>
<style scoped>
* {
  scroll-behavior: smooth;
  transition: all;
  transition-duration: 5s;
}
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
