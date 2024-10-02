<template>
  <div class="card shadow mb-4 mt-10 w-[100%] text-center">
    <div class="card-header py-3">
      <h6 class="m-0 my-10 font-weight-bold text-5xl text-[#085f63]">Details Customer</h6>
    </div>

    <div v-if="customer" class="p-10">
      <h3>Medical Record</h3>

      <h6 class="my-5 text-left">Details Customer: {{ customer.name }}</h6>

      <ul class="text-3xl">
        <li
          class="py-3 flex justify-around"
          v-for="record in customer.medicalRecords"
          :key="record.id"
        >
          <div>{{ record.note }}</div>
          <div>{{ record.date }}</div>
          <hr class="sidebar-divider bg-[#085f63]" />
        </li>
      </ul>
      <div class="flex justify-between mt-5">
        <p class="text-left">DATE: {{ customer.dob }}</p>
        <button
          class="px-2 py-1 rounded-xl bg-[#085f63] text-white font-bold mb-28"
          @click="addMedicalRecord"
        >
          Add Medical Record
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'CustomerDetails',
  components: {},
  props: ['customer'],
  methods: {
    async addMedicalRecord() {
      const { value: note } = await Swal.fire({
        title: ' add Medical Record',
        input: 'textarea',
        inputLabel: 'add Medical Record :',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'You Should Be Enter Medical Record !'
          }
        }
      })

      if (note) {
        const newRecord = {
          id: Date.now(),
          note,
          date: new Date().toISOString().split('T')[0]
        }
        // eslint-disable-next-line vue/no-mutating-props
        this.customer.medicalRecords.push(newRecord)
      }
    }
  }
}
</script>
