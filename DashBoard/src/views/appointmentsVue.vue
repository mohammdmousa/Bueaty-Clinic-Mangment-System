<template>
  <div class="service p-10 w-[100%] grid place-items-center bg-[rgba(166,166,166,0.26)]">
    <h1 class="text-[#085f63] pb-[50px]">appointments-management</h1>

    <input type="date" class="date-input" v-model="selectedDate" @change="getAppointments" />

    <div class="card shadow mb-4 mt-10 w-[100%] text-center">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-5xl text-[#085f63]">List Appointments</h6>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table
            v-if="appointments.length"
            class="table table-bordered"
            id="dataTable"
            width="100%"
            cellspacing="0"
          >
            <thead>
              <tr>
                <th>DATE</th>
                <th>TIME</th>
                <th>END TIME</th>
                <th>STATE</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="appointment in appointments" :key="appointment.id">
                <td>{{ appointment.date }}</td>
                <td>{{ appointment.fromtime }}</td>
                <td>{{ appointment.totime }}</td>
                <td>{{ appointment.state }}</td>
                <!-- <td>{{ appointment.patient }}</td> -->
                <!-- <td>{{ appointment.state }}</td> -->
                <td class="flex justify-around">
                  <button
                    class="px-2 py-1 rounded-xl bg-[#f1345d] text-white font-bold"
                    @click="rejectAppointment(appointment.id)"
                  >
                    rejectAppointment
                  </button>
                  <button
                    class="px-2 py-1 rounded-xl bg-[#085f63] text-white font-bold"
                    @click="rescheduleAppointment(appointment)"
                  >
                    rescheduleAppointment
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else style="text-transform: uppercase">THER ARE NO appointments FOR TODAY</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
// import calenderVue from '@/components/calenderVue.vue'
export default {
  components: {
    // calenderVue
  },
  data() {
    return {
      showAddAppointment: false,
      id: '',
      date: '',
      fromtime: '',
      totime: '',
      servicename: '',
      currentappointment: {
        id: '',
        name: '',
        date: '',
        fromtime: '',
        totime: '',
        servicename: ''
      },
      appointments: [],
      selectedDate: new Date().toISOString().split('T')[0]
    }
  },
  created() {
    // this.$store.dispatch('fetchservicess')
  },
  methods: {
    async getAppointments() {
      const token = localStorage.getItem('aouth_token')
      if (!token) {
        console.error('No auth token found')
        this.appointments = []
        return
      }
      console.log(this.appointments)
      console.log(this.selectedDate)
      const response = await fetch('http://localhost:8000/api/doctor/my_appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          date: this.selectedDate
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
 
    rejectAppointment(id) {
      this.$store.dispatch('deleteAppointment_doctor', id)
    },
    async rescheduleAppointment(appointment) {
      const { value: formValues } = await Swal.fire({
        title: ' rescheduleAppointment',
        html:
          `<label> NEW DATE :</label> <input id="swal-input1" type="date" value="${appointment.date}" class="swal2-input"><br>` +
          `<label>NEW TIME :</label> <input id="swal-input2" type="time" value="${appointment.time}" class="swal2-input">` +
          `<label>NEW TIME :</label> <input id="swal-input3" type="time" value="${appointment.time}" class="swal2-input">`,
        focusConfirm: false,
        preConfirm: () => {
          return {
            date: document.getElementById('swal-input1').value.toLocaleString().split('T')[0],
            time: document.getElementById('swal-input2').value.toLocaleString().split('T')[0]
          }
        }
      })

      if (formValues) {
        try {
          this.currentappointment = { ...appointment }
          await this.$store.dispatch('updateappointment_doctor', {
            id: this.currentappointment.id,
            date: document.getElementById('swal-input1').value.toLocaleString().split('T')[0],
            fromtime: document.getElementById('swal-input2').value.toLocaleString().split('T')[0],
            totime: document.getElementById('swal-input3').value.toLocaleString().split('T')[0],
            servicename: this.currentappointment.servicename
          })
        } catch (error) {
          console.error('Error updating doctor:', error)
        }
        appointment.date = formValues.date
        appointment.time = formValues.time
      }
    }
  }
}
</script>
<style scoped>
.date-input {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  height: 50px;
  font-size: 1.5em;
  text-transform: uppercase;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-top: 15px;
}

li {
  margin-bottom: 5px;
  background-color: #f9f9f9;
  padding: 8px;
  border-radius: 4px;
  color: #085f63;
  font-size: 20px;
}
</style>
