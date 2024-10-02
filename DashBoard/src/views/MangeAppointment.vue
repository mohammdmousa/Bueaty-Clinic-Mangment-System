<template>
  <div class="service p-10 w-full grid place-items-center bg-gray-200">
    <h1 class="text-teal-700 pb-12 text-3xl font-bold">Appointments Management</h1>
    <div class="form-container w-full bg-white p-6 rounded-lg shadow-lg">
      <h3 class="text-center font-bold text-teal-700 text-2xl mb-4">Appointment</h3>
      <form @submit.prevent="getAppointments">
        <div class="box flex mb-4 gap-x-5 items-center">
          <label class="text-teal-700 w-1/4">Date</label>
          <input
            type="date"
            class="form-control bg-gray-100 border border-gray-300 rounded-lg p-2 w-3/4"
            v-model="date"
            required
          />
        </div>

        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">Doctor</label>
          <select
            id="sel"
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            required
            v-model="id"
          >
            <option
              v-for="dox in this.$store.state.appointment.doctors"
              :key="dox.id"
              :value="dox.id"
            >
              {{ dox.name }}
            </option>
          </select>
        </div>
        <div class="box flex justify-around mt-6">
          <button
            class="bg-red-500 text-white py-2 px-6 rounded-full font-bold flex items-center gap-2"
            type="submit"
          >
            <i class="fas fa-check-circle"></i> GET
          </button>
        </div>
      </form>
    </div>
    <div class="card shadow mb-4 mt-10 w-full text-center bg-white p-6 rounded-lg">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-2xl text-teal-700">List Appointments</h6>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered w-full text-left">
            <thead class="bg-teal-700 text-white">
              <tr>
                <th class="p-3">Date</th>
                <th class="p-3">Time</th>
                <th class="p-3">Customer</th>
                <th class="p-3">State</th>
                <th class="p-3">Actions</th>
              </tr>
            </thead>
            <tr v-if="appointments.length === 0">
              <td colspan="5" class="text-center">No appointments found for this doctor.</td>
            </tr>
            <tbody>
              <!-- <tr v-if="this.$store.state.appointment.appointments.length === 0">
                <td colspan="5" class="text-center">No appointments found for this doctor.</td>
              </tr> -->
              <tr
                v-for="appointment in appointments"
                :key="appointment.id"
                class="hover:bg-gray-100 cursor-pointer"
              >
                <td class="p-3">{{ appointment.date }}</td>
                <td class="p-3">{{ appointment.fromtime }}</td>
                <td class="p-3">{{ appointment.name }}</td>
                <td class="p-3">{{ appointment.state }}</td>
                <td class="p-3 flex justify-around">
                  <button
                    class="px-3 py-1 rounded-full bg-red-500 text-white font-bold flex items-center gap-2"
                    @click="deleteAppointment(appointment.id)"
                  >
                    <i class="fas fa-times-circle"></i> Reject
                  </button>
                  <button
                    class="px-3 py-1 rounded-full bg-teal-700 text-white font-bold flex items-center gap-2"
                    @click="editappointment(appointment)"
                  >
                    <i class="fas fa-calendar-alt"></i> Reschedule
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div
      v-if="showEditappointmentForm"
      class="form-container w-full bg-white p-6 rounded-lg shadow-md mt-10"
    >
      <h3 class="text-center font-bold text-[#085f63] text-xl mb-4">Update appointment</h3>
      <form @submit.prevent="updateappointment">
        <div
          v-if="this.$store.state.appointment.errors.length > 0"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4"
        >
          <div class="flex">
            <div>
              <ul class="list-disc pl-6">
                <li v-for="er in this.$store.state.appointment.errors" :key="er.totime">
                  <span v-if="er.totime">{{ er.totime.toString() }}</span>
                  <span v-if="er.message">{{ er.fromtime.toString() }}</span>
                </li>
                <li
                  v-if="
                    this.$store.state.appointment.errors &&
                    this.$store.state.appointment.errors.length === 0
                  "
                >
                  No errors found.
                </li>
                <li v-if="!this.$store.state.appointment.errors">Error data is not available.</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]"> Id</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="currentappointment.id"
            required
          />
        </div>

        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">name</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="currentappointment.name"
            required
          />
        </div>
        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">date</label>
          <input
            type="date"
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="currentappointment.date"
            required
          />
        </div>
        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">fromtime</label>
          <input
            type="time"
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="currentappointment.fromtime"
            required
          />
        </div>
        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">totime</label>
          <input
            type="time"
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="currentappointment.totime"
            required
          />
        </div>

        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]"> service</label>
          <select
            id="sel"
            v-model="currentappointment.servicename"
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            required
          >
            <option
              v-for="ser in this.$store.state.services.servicess"
              :key="ser.id"
              :value="ser.name"
            >
              {{ ser.name }}
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
            @click="showEditappointmentForm = false"
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
      id: '',
      date: '',
      appointments: [],
      currentappointment: {
        id: '',
        name: '',
        date: '',
        fromtime: '',
        totime: '',
        servicename: ''
      },
      showEditappointmentForm: false
    }
  },
  created() {
    this.$store.dispatch('fetchDoctorr')
    this.$store.dispatch('fetchservicess')
  },
  methods: {
    editappointment(appointment) {
      this.currentappointment = { ...appointment }
      this.showEditappointmentForm = true
    },

    async updateappointment() {
      const d = this.currentappointment.date.toLocaleString().split('T')[0]
      console.log(d)
      const dft = this.currentappointment.fromtime.toLocaleString().split('T')[0]
      console.log(dft)
      const dtt = this.currentappointment.totime.toLocaleString().split('T')[0]
      console.log(dtt)

      try {
        await this.$store.dispatch('updateappointment', {
          id: this.currentappointment.id,

          name: this.currentappointment.name,
          date: d,
          fromtime: dft,
          totime: dtt,
          servicename: this.currentappointment.servicename
        })

        this.currentService = {
          id: '',
          name: '',
          date: '',
          fromtime: '',
          totime: '',
          servicename: ''
        }
        this.showEditServiceForm = false
      } catch (error) {
        console.error('Error updating doctor:', error)
      }
    },

    async getAppointments() {
      const d = this.date.toLocaleString().split('T')[0]
      console.log(d)
      const token = localStorage.getItem('aouth_token')
      if (!token) {
        console.error('No auth token found')
        this.appointments = []
        return
      }

      const response = await fetch('http://localhost:8000/api/secrtary/doctor_appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          id: this.id,
          date: d
        })
      })

      if (!response.ok) {
        console.error('Failed to fetch doctor appointments:', response.statusText)
        this.appointments = []
        return
      }

      const data = await response.json()
      this.appointments = data.appointments || []
      console.log(this.appointments)
    },
    deleteAppointment(id) {
      this.$store.dispatch('deleteAppointment', id)
    }
  }
}
</script>

<style scoped>
.service {
  background-color: rgba(166, 166, 166, 0.26);
}
.date-picker-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.date-input {
  width: 100%;
  max-width: 300px;
}
.table th,
.table td {
  padding: 1rem;
}
</style>
