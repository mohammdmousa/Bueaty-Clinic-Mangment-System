<template>
  <div class="service p-10 w-full grid place-items-center bg-gray-200">
    <h2 class="text-teal-700 pb-12 text-3xl font-bold">Appointment Management</h2>
    <button
      class="bg-teal-700 w-full text-white p-3 mb-10 rounded-full flex items-center justify-center gap-2"
      @click="showAddAppointment = true"
    >
      <i class="fas fa-plus-circle"></i> Add Appointment
    </button>
    <div v-if="showAddAppointment" class="form-container w-full bg-white p-6 rounded-lg shadow-lg">
      <h3 class="text-center font-bold text-teal-700 text-2xl mb-4">Add Appointment</h3>
      <form @submit.prevent="addAppointment">
        <div
          v-if="this.$store.state.appointment.errors.length > 0"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4"
        >
          <div class="flex">
            <div>
              <ul class="list-disc pl-6">
                <li v-for="er in this.$store.state.appointment.errors" :key="er.totime">
                  <span v-if="er.totime">{{ er.totime.toString() }}</span>
                  <!-- <span v-if="er.totime">{{ er.message.toString() }}</span> -->
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
        <div class="box flex mb-4 gap-x-5 items-center">
          <label class="text-teal-700 w-1/4">ID Of Doctor</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg p-2 w-3/4"
            v-model="id"
            required
          />
        </div>
        <div class="box flex mb-4 gap-x-5 items-center">
          <label class="text-teal-700 w-1/4">Date</label>
          <input
            type="date"
            class="form-control bg-gray-100 border border-gray-300 rounded-lg p-2 w-3/4"
            v-model="date"
            required
          />
        </div>
        <div class="box flex mb-4 gap-x-5 items-center">
          <label class="text-teal-700 w-1/4">fromtime</label>
          <input
            type="time"
            class="form-control bg-gray-100 border border-gray-300 rounded-lg p-2 w-3/4"
            v-model="fromtime"
            required
          />
        </div>
        <div class="box flex mb-4 gap-x-5 items-center">
          <label class="text-teal-700 w-1/4">totime</label>
          <input
            type="time"
            class="form-control bg-gray-100 border border-gray-300 rounded-lg p-2 w-3/4"
            v-model="totime"
            required
          />
        </div>
        <div class="box flex mb-4 gap-x-5 items-center">
          <label class="text-teal-700 w-1/4">Name</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg p-2 w-3/4"
            v-model="name"
            required
          />
        </div>
        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">Service Name</label>
          <select
            id="sel"
            v-model="servicename"
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
        <div class="box flex justify-around mt-6">
          <button
            class="bg-red-500 text-white py-2 px-6 rounded-full font-bold flex items-center gap-2"
            type="submit"
          >
            <i class="fas fa-check-circle"></i> Add
          </button>
          <button
            class="bg-red-500 text-white py-2 px-6 rounded-full font-bold flex items-center gap-2"
            type="button"
            @click="showAddAppointment = false"
          >
            <i class="fas fa-times-circle"></i> Cancel
          </button>
        </div>
      </form>
    </div>
    <div class="card shadow mb-4 mt-10 w-full text-center bg-white p-6 rounded-lg">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-2xl text-teal-700">List of Doctors</h6>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered w-full text-left">
            <thead class="bg-teal-700 text-white">
              <tr>
                <th class="p-3">Doctor ID</th>
                <th class="p-3">Doctor Name</th>
                <!-- <th class="p-3">Specialty</th> -->
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="dox in this.$store.state.appointment.doctors"
                :key="dox.id"
                @click="selectDoctor(dox)"
                class="hover:bg-gray-100 cursor-pointer"
              >
                <!-- <button @click="selectDoctor(dox)">da;vknsdlv</button> -->
                <td class="p-3">{{ dox.id }}</td>
                <td class="p-3">{{ dox.name }}</td>
                <!-- <td class="p-3">{{ doctor.specialty }}</td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-if="selectedDoctor" class="card shadow mb-4 mt-10 w-[100%] text-center">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-5xl text-[#085f63]">
          Appointments for {{ selectedDoctor.name }}
        </h6>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TIME</th>
                <th>PATIENT</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="appointments.length === 0">
                <td colspan="5" class="text-center">No appointments found for this doctor.</td>
              </tr>

              <tr v-for="appointment in appointments" :key="appointment.id">
                <td>{{ appointment.user_id }}</td>
                <td>{{ appointment.date }}</td>
                <td>{{ appointment.fromtime }}</td>
                <td>{{ appointment.name }}</td>
                <td>{{ appointment.state }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      showAddAppointment: false,

      id: '',
      date: '',
      fromtime: '',
      totime: '',
      name: '',
      servicename: '',
      selectedDoctor: null,

      appointments: []
    }
  },
  methods: {
    addAppointment() {
      const d = this.date.toLocaleString().split('T')[0]
      console.log(d)
      const dft = this.fromtime.toLocaleString().split('T')[0]
      console.log(dft)
      const dtt = this.totime.toLocaleString().split('T')[0]
      console.log(dtt)
      this.$store
        .dispatch('addappointment', {
          id: this.id,
          name: this.name,
          date: d,
          fromtime: dft,
          totime: dtt,
          servicename: this.servicename
        })
        .then(() => {
          this.showAddAppointment = false
          // this.resetNewServiceForm()
        })
        .catch((error) => {
          console.error('Error adding appointment:', error)
        })
    },
    async selectDoctor(doctor) {
      const currentDate = new Date().toISOString().split('T')[0]
      this.$store.dispatch('fetchAppointments', {
        id: doctor.id,
        date: currentDate
      })
      this.selectedDoctor = doctor
      await this.getDoctorAppointments(doctor.id)
    },
    async getDoctorAppointments(doctorId) {
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
          id: doctorId,
          date: new Date().toISOString().split('T')[0]
        })
      })

      if (!response.ok) {
        console.error('Failed to fetch doctor appointments:', response.statusText)
        this.appointments = []
        return
      }

      const data = await response.json()
      this.appointments = data.appointments || []
    }
  },
  created() {
    this.$store.dispatch('fetchDoctorr')
    this.$store.dispatch('fetchservicess')
  }
}
</script>

<style></style>
