<template>
  <div class="min-h-screen flex items-center justify-center bg-[#085f63]">
    <div class="max-w-md w-full bg-white shadow-lg rounded-[40px] p-8 space-y-6">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-[#085f63] mb-4">Welcome Back!</h1>
      </div>

      <form @submit.prevent="login" class="space-y-6">
        <div
          v-if="errorMessages.length > 0"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4"
        >
          <div class="flex">
            <div>
              <ul class="list-disc pl-6">
                <li v-for="(error, index) in errorMessages" :key="index">{{ error }}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="form-group relative">
          <input
            v-model="email"
            class="form-input w-full py-2 px-4 ml-[10px] pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f1345d] focus:border-transparent"
            placeholder="Email addres..."
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i class="fas fa-envelope text-gray-400"></i>
          </div>
        </div>
        <div class="form-group relative">
          <input
            v-model="password"
            type="password"
            class="form-input w-full ml-[10px] py-2 px-4 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f1345d] focus:border-transparent"
            placeholder="password"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i class="fas fa-lock text-gray-400"></i>
          </div>
        </div>
        <button
          class="w-full py-2 px-4 bg-[#f1345d] text-white font-bold rounded-full hover:bg-[#d12f51] focus:outline-none focus:ring-2 focus:ring-[#f1345d] focus:ring-opacity-50"
        >
          LOG IN
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessages: []
    }
  },
  methods: {
    async login() {
      console.log('Sign up with', this.email, this.password)
      try {
        const response = await fetch('http://localhost:8000/api/loginall/loginall', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        })
        if (!response.ok) {
          const errorData = await response.json()
          this.errorMessages = []

          if (errorData.email) {
            this.errorMessages.push(errorData.email.toString())
          }
          if (errorData.password) {
            this.errorMessages.push(errorData.password.toString())
          }

          throw new Error('Network response was no')
        }
        if (response.ok) {
          console.log(response)
          const data = await response.json()
          document.cookie = `aouth_token=${data.access_token}`
          localStorage.setItem('aouth_token', data.access_token)
          console.log(data)
          if (data.user_type == 'admin') {
            this.$router.push({ path: '/admin/MangeEmployee' })
          } else if (data.user_type == 'doctor') {
            this.$router.push({ path: '/doctor/appointmentsVue' })
          } else {
            this.$router.push({ path: '/employee/MangeAppointment' })
          }
        } else {
          console.log(response)
          Swal.fire({
            title: 'error',
            text: 'Mail Is Not Correct!',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      } catch (error) {
        Swal.fire({
          title: 'error',
          text: 'Mail Is Not Correct!',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    }
  }
}
</script>

<style scoped>
body {
  font-family: 'Cairo', sans-serif;
}
</style>
