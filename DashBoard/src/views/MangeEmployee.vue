<template>
  <div class="service p-10 w-full grid place-items-center bg-gray-200">
    <h2 class="text-[#085f63] pb-12 text-3xl font-bold">Employee Management</h2>
    <button
      class="bg-[#085f63] w-full text-white py-3 mb-10 rounded-full shadow-lg hover:bg-[#064f50] transition"
      @click="showAddEmployeeform = true"
    >
      <i class="fas fa-user-plus mr-2"></i>Add Employee
    </button>
    <div v-if="showAddEmployeeform" class="form-container w-full bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-center font-bold text-[#085f63] text-xl mb-4">Add New Employee</h3>
      <form @submit.prevent="addEmployee(this.name, this.email, this.password)">
        <div
          v-if="this.$store.state.employee.errors.length > 0"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4"
        >
          <div class="flex">
            <div>
              <ul class="list-disc pl-6">
                <li v-for="hh in this.$store.state.employee.errors">
                  {{ hh.email.toString() }}
                </li>
                <li v-for="hh in this.$store.state.employee.errors">
                  {{ hh.password.toString() }}
                </li>
                <!-- <li v-for="(error, index) in errorMessages" :key="index">{{ error }}</li> -->
              </ul>
            </div>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-[#085f63] mb-2">Employee Name</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="name"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-[#085f63] mb-2">Employee email</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="email"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-[#085f63] mb-2">Employee Password</label>
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
            @click="showAddEmployeeform = false"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
    <div class="card shadow mb-4 mt-10 w-full text-center">
      <div class="card-header py-6 bg-[#085f63] text-white rounded-t-lg">
        <h6 class="m-0 font-weight-bold text-2xl text-[#d12d51]">List Employee</h6>
      </div>
      <div class="card-body bg-white p-6 rounded-b-lg shadow-inner">
        <div class="table-responsive">
          <table class="table table-bordered w-full">
            <thead class="bg-[#085f63] text-white">
              <tr>
                <th class="py-2">Name Employee</th>
                <th class="py-2">Email Employee</th>
                <th class="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="emm in Employees" :key="emm.id" class="border-b">
                <td class="py-2">{{ emm.name }}</td>
                <td class="py-2">{{ emm.email }}</td>
                <td class="py-2 flex justify-around">
                  <button
                    class="p-2 rounded-xl bg-[#085f63] text-white font-bold mr-2 shadow-md hover:bg-[#064f50] transition"
                    @click="editEmployee(emm)"
                  >
                    <i class="fas fa-edit"></i> Update
                  </button>
                  <button
                    class="p-2 rounded-xl bg-[#f1345d] text-white font-bold shadow-md hover:bg-[#d12d51] transition"
                    @click="deleteEmployee(emm.id)"
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
      v-if="showEditEmployeeform"
      class="form-container w-full bg-white p-6 rounded-lg shadow-md mt-10"
    >
      <h3 class="text-center font-bold text-[#085f63] text-xl mb-4">Update Employee</h3>
      <form @submit.prevent="updateEmployee">
        <div
          v-if="this.$store.state.employee.errorss.length > 0"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4"
        >
          <div class="flex">
            <div>
              <ul class="list-disc pl-6">
                <li v-for="er in this.$store.state.employee.errorss" :key="er.email">
                  <span v-if="er.email">{{ er.email.toString() }}</span>
                  <span v-if="er.password">{{ er.password.toString() }}</span>
                </li>
                <li
                  v-if="
                    this.$store.state.employee.errorss &&
                    this.$store.state.employee.errorss.length === 0
                  "
                >
                  No errors found.
                </li>
                <li v-if="!this.$store.state.employee.errorss">Error data is not available.</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">Employee Name</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="currentEmployee.name"
            required
          />
        </div>
        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">Employee email</label>
          <input
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="currentEmployee.email"
            required
          />
        </div>

        <div class="mb-4 flex items-center gap-x-5">
          <label class="text-[#085f63] w-[20%]">Employee Password</label>
          <input
            type="password"
            class="form-control bg-gray-100 border border-gray-300 rounded-lg w-full p-2"
            v-model="currentEmployee.password"
            required
          />
        </div>
        <div class="flex justify-evenly mb-3 gap-x-5">
          <button
            class="bg-[#f1345d] text-white py-2 px-5 rounded-full font-extrabold shadow-md hover:bg-[#d12d51] transition"
            type="submit"
          >
            Save
          </button>
          <button
            class="bg-gray-400 text-white py-2 px-5 rounded-full font-extrabold shadow-md hover:bg-gray-500 transition"
            type="button"
            @click="showEditEmployeeform = false"
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
      email: '',
      password: '',

      currentEmployee: {
        id: '',
        name: '',
        email: '',
        password: ''
      },
      showAddEmployeeform: false,
      showEditEmployeeform: false
    }
  },
  computed: {
    Employees() {
      return this.$store.state.employee.employees
    }
  },
  created() {
    return this.$store.dispatch('fetchEmployees')
  },
  methods: {
    addEmployee() {
      this.$store
        .dispatch('addEmployee', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(() => {
          if (
            !this.$store.state.employee.errors ||
            this.$store.state.employee.errors.length === 0
          ) {
            this.showAddEmployeeForm = false
            this.resetNewEmployeeForm()
            Swal.fire({
              title: 'Success',
              text: 'Employee added successfully!',
              icon: 'success',
              confirmButtonText: 'OK'
            })
          }
        })
        .catch((error) => {
          console.error('Error adding employee:', error)
        })
    },
    editEmployee(Employee) {
      this.currentEmployee = { ...Employee }
      this.showEditEmployeeform = true
    },
    async updateEmployee() {
      try {
        await this.$store.dispatch('updateEmployee', this.currentEmployee).then(() => {
          if (
            !this.$store.state.employee.errorss ||
            this.$store.state.employee.errorss.length === 0
          ) {
            this.currentEmployee = { id: '', name: '', email: '', password: '' }
            Swal.fire({
              title: 'Success',
              text: 'Employee updated successfully!',
              icon: 'success',
              confirmButtonText: 'OK'
            })
          }
        })

        // this.currentEmployee = { id: '', name: '', email: '', password: '' }
        // this.showEditEmployeeform = false
        // Swal.fire({
        //   title: 'Success',
        //   text: 'Employee updated successfully!',
        //   icon: 'success',
        //   confirmButtonText: 'OK'
        // })
      } catch (error) {
        console.error('Error updating employee:', error)
      }
    },
    deleteEmployee(EmployeeId) {
      this.$store.dispatch('deleteEmployee', EmployeeId)
      Swal.fire({
        title: 'Success',
        text: 'Employee deleted successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    },
    resetNewEmployeeForm() {
      this.name = ''
      this.email = ''
      this.password = ''
    }
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
