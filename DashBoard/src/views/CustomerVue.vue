<template>
  <div class="service p-10 w-[100%] grid place-items-center bg-[rgba(166,166,166,0.26)]">
    <button
      class="bg-teal-700 w-full text-white p-3 mb-10 rounded-full flex items-center justify-center gap-2"
      @click="showAddpatient = true"
    >
      <i class="fas fa-plus-circle"></i> Add Patient
    </button>
    <div v-if="showAddpatient" class="form-container w-full bg-white p-6 rounded-lg shadow-lg">
      <h3 class="text-center font-bold text-teal-700 text-2xl mb-4">Add Patient</h3>
      <form @submit.prevent="addpatient">
        <div class="box flex mb-4 gap-x-5 items-center">
          <label class="text-teal-700 w-1/4">*Name</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg p-2 w-3/4"
            v-model="name"
            required
          />
        </div>
        <div class="box flex mb-4 gap-x-5 items-center">
          <label class="text-teal-700 w-1/4">*service_name</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg p-2 w-3/4"
            v-model="service_name"
            required
          />
        </div>
        <div class="box flex mb-4 gap-x-5 items-center">
          <label class="text-teal-700 w-1/4">location</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg p-2 w-3/4"
            v-model="location"
          />
        </div>
        <div class="box flex mb-4 gap-x-5 items-center">
          <label class="text-teal-700 w-1/4">*phone</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg p-2 w-3/4"
            v-model="phone"
            required
          />
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
            @click="showAddpatient = false"
          >
            <i class="fas fa-times-circle"></i> Cancel
          </button>
        </div>
      </form>
    </div>
    <h1 class="text-[#085f63] pb-[50px]">patient-management</h1>

    <div class="card shadow mb-4 mt-10 w-[100%] text-center">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-5xl text-[#085f63]">List patient</h6>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Service</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="customer in patients" :key="customer.id" @click="selectCustomer(customer)">
                <td>{{ customer.name }}</td>
                <td>{{ customer.service_name }}</td>
                <td>{{ customer.phone }}</td>
                <td class="py-2 flex justify-around">
                  <button
                    class="p-2 rounded-xl bg-[#085f63] text-white font-bold mr-2 shadow-md hover:bg-[#064f50] transition"
                    @click="editpatient(customer)"
                  >
                    <i class="fas fa-edit"></i> Update
                  </button>
                  <button
                    class="p-2 rounded-xl bg-[#f1345d] text-white font-bold shadow-md hover:bg-[#d12d51] transition"
                    @click="deletepatient(customer.id)"
                  >
                    <i class="fas fa-trash-alt"></i> Delete
                  </button>
                  <button
                    class="p-2 rounded-xl bg-[#085f63] text-white font-bold mr-2 shadow-md hover:bg-[#064f50] transition"
                    @click="addrecorde(customer)"
                  >
                    <i class="fas fa-plus-circle"></i> ADD
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-if="selectedCustomer" class="card shadow mb-4 mt-10 w-[100%] text-center">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-5xl text-[#085f63]">Recorde</h6>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>DESCRIPTION</th>
                <th>NOTE</th>
                <th>ACTIONS</th>

                <!-- <th>STATUS</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-if="records.length === 0">
                <td colspan="5" class="text-center">No recorde found for this patient.</td>
              </tr>

              <tr v-for="record in records" :key="record.id">
                <td>{{ record.patient_id }}</td>
                <td>{{ record.date }}</td>
                <td>{{ record.description }}</td>
                <td>{{ record.note }}</td>
                <td class="py-2 flex justify-around">
                  <button
                    class="p-2 rounded-xl bg-[#085f63] text-white font-bold mr-2 shadow-md hover:bg-[#064f50] transition"
                    @click="editrecorde(record)"
                  >
                    <i class="fas fa-edit"></i> Update
                  </button>
                  <button
                    class="p-2 rounded-xl bg-[#f1345d] text-white font-bold shadow-md hover:bg-[#d12d51] transition"
                    @click="deleterecorde(record.id)"
                  >
                    <i class="fas fa-trash-alt"></i> Delete
                  </button>
                </td>
                <!-- <td>{{ record.state }}</td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-if="showaddrecordeForm" class="form-container w-full bg-white p-6 rounded-lg shadow-lg">
      <h3 class="text-center font-bold text-teal-700 text-2xl mb-4">Add recorde</h3>
      <form @submit.prevent="addrecordee">
        <!-- <div class="box flex mb-4 gap-x-5 items-center">
          <label class="text-teal-700 w-1/4">Id Patient</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg p-2 w-3/4"
            v-model="currentrecorde.patient_id"
            required
          />
        </div>
        <div class="box flex mb-4 gap-x-5 items-center">
          <label class="text-teal-700 w-1/4">DATE</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg p-2 w-3/4"
            v-model="currentrecorde.date"
            required
          />
        </div> -->
        <div class="box flex mb-4 gap-x-5 items-center">
          <label class="text-teal-700 w-1/4">NOTE</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg p-2 w-3/4"
            v-model="currentrecorde.note"
            required
          />
        </div>
        <div class="box flex mb-4 gap-x-5 items-center">
          <label class="text-teal-700 w-1/4">DESCRIPTION</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg p-2 w-3/4"
            v-model="currentrecorde.description"
            required
          />
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
            @click="showaddrecordeForm = false"
          >
            <i class="fas fa-times-circle"></i> Cancel
          </button>
        </div>
      </form>
    </div>
    <!-- <CustomerDetails v-if="selectedCustomer" :customer="selectedCustomer" /> -->
    <div
      v-if="showEditpatientForm"
      class="form-container w-full bg-white p-6 rounded-lg shadow-md mt-10"
    >
      <h3 class="text-center font-bold text-[#085f63] text-xl mb-4">Update Patient</h3>
      <form @submit.prevent="updatepatient">
        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">Name</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="currentpatient.name"
            required
          />
        </div>
        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">Service Name</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="currentpatient.service_name"
            required
          />
        </div>
        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">Location</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="currentpatient.location"
            required
          />
        </div>
        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">Phone</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="currentpatient.phone"
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
            @click="showEditpatientForm = false"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

    <!-- <p>{{ patients }} from pat</p> -->
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  components: {
    // CustomerDetails
  },
  data() {
    return {
      id: '',
      par: '',
      name: '',
      service_name: '',
      location: '',
      phone: '',
      currentpatient: { id: '', name: '', service_name: '', location: '', phone: '' },
      currentrecorde: { patient_id: '', date: '', note: '', description: '' },
      showAddpatient: false,
      showAddrecorde: false,
      showEditpatientForm: false,
      showaddrecordeForm: false,
      selectedCustomer: null,
      records: []
    }
  },
  created() {
    this.$store.dispatch('fetchpatient')
    // this.pat = this.$store.state.patient.patients
  },

  computed: {
    patients() {
      return this.$store.state.patient.patients
    }
  },

  methods: {
    addpatient() {
      this.$store
        .dispatch('addpatient', {
          name: this.name,
          service_name: this.service_name,
          location: this.location,
          phone: this.phone
        })
        .then(() => {
          this.showAddpatient = false
          // this.resetNewServiceForm()
        })
        .catch((error) => {
          console.error('Error adding appointment:', error)
        })
    },
    addrecorde(record) {
      this.currentrecorde = { ...record }
      this.showaddrecordeForm = true
      console.log(record)
    },
    addrecordee() {
      const currentDate = new Date().toISOString().split('T')[0]
      console.log(this.currentrecorde)
      this.$store
        .dispatch('addrecordee', {
          patient_id: this.currentrecorde.id,
          date: currentDate,
          note: this.currentrecorde.note,
          description: this.currentrecorde.description
        })
        .then(() => {
          this.showAddrecorde = false
          // this.resetNewServiceForm()
        })
        .catch((error) => {
          console.error('Error adding appointment:', error)
        })
    },
    deletepatient(patientId) {
      this.$store.dispatch('deletepatient', patientId)
    },
    deleterecorde(recordeId) {
      this.$store.dispatch('deleterecorde', recordeId)
    },
    editpatient(patient) {
      this.currentpatient = { ...patient }
      this.showEditpatientForm = true
    },

    async updatepatient() {
      try {
        await this.$store.dispatch('updatepatient', this.currentpatient)

        this.currentService = { name: '', service_name: '', location: '', phone: '' }
        this.showEditpatientForm = false
      } catch (error) {
        console.error('Error updating patient:', error)
      }
    },
    async selectCustomer(customer) {
      this.$store.dispatch('fetchrecordes', {
        id: customer.id
      })
      this.selectedCustomer = customer
      await this.getrecorde(customer.id)
    },
    async getrecorde(customerId) {
      const token = localStorage.getItem('aouth_token')
      if (!token) {
        console.error('No auth token found')
        this.records = []
        return
      }

      const response = await fetch('http://localhost:8000/api/doctor/patient_record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          id: customerId
        })
      })

      if (!response.ok) {
        console.error('Failed to fetch doctor appointments:', response.statusText)
        this.records = []
        return
      }

      const data = await response.json()
      this.records = data.records || []
    },

    async editrecorde(record) {
      this.currentrecorde = { ...record }

      const { value: newRecord } = await Swal.fire({
        title: ' update Medical Record',
        html: `<label> NEW RECORDE :</label> <input id="swal-input1" type="text" value="${this.currentrecorde.description}" class="swal2-input"><br>`,

        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'You Should Be Enter Medical Record !'
          }
        },
        preConfirm: () => {
          return {
            description: document.getElementById('swal-input1').value
          }
        }
      })

      if (newRecord) {
        try {
          await this.$store.dispatch('update_record', {
            id: this.currentrecorde.id,
            date: this.currentrecorde.date,
            note: this.currentrecorde.note,
            description: document.getElementById('swal-input1').value
          })

          // this.showEditpatientForm = false
        } catch (error) {
          console.error('Error updating recorde:', error)
        }
      }
    }
  }
}
</script>
