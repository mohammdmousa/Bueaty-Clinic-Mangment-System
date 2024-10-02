<template>
  <div class="calendar-container mx-auto py-16">
    <div class="calendar-header">
      <button @click="previousMonth"><i class="fa fa-chevron-left"></i></button>
      <div class="calendar-header-info">
        <span class="calendar-month">{{ currentMonthName }}</span>
        <span class="calendar-year">{{ currentYear }}</span>
      </div>
      <button @click="nextMonth"><i class="fa fa-chevron-right"></i></button>
    </div>
    <table class="calendar-table">
      <thead>
        <tr>
          <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, index) in calendar" :key="index">
          <td
            v-for="(day, idx) in week"
            :key="idx"
            :class="{ empty: day === '', selected: isSelected(day) }"
            @click="selectDate(day)"
          >
            {{ day }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
// import './Calendar.css';

export default {
  name: 'CalendarVue',
  data() {
    return {
      appointments: [],
      selectedDate: null
    }
  },
  methods: {
    fetchAppointments(date) {
      // استبدل هذا الجزء بجلب البيانات من قاعدة البيانات أو API
      const allAppointments = [
        { id: 1, date: '2024-06-28', time: '10:00', patient: 'محمد', status: 'في الانتظار' },
        { id: 2, date: '2024-06-29', time: '12:00', patient: 'أحمد', status: 'في الانتظار' }
        // أضف مواعيد إضافية هنا للاختبار
      ]

      // تصفية المواعيد حسب التاريخ المحدد
      this.appointments = allAppointments.filter((appointment) => appointment.date === date)
    },
    selectDate(day) {
      if (day === '') return
      const selected = new Date(this.currentYear, this.currentMonth, day)
      this.selectedDate = selected.toISOString().split('T')[0]
      this.fetchAppointments(this.selectedDate)
    },
    isSelected(day) {
      if (day === '') return false
      const selected = new Date(this.currentYear, this.currentMonth, day)
      return selected.toISOString().split('T')[0] === this.selectedDate
    }
  },
  setup() {
    const currentDate = ref(new Date())

    const daysOfWeek = ref(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])

    const currentMonthName = computed(() =>
      currentDate.value.toLocaleDateString('en-US', { month: 'long' })
    )
    const currentYear = computed(() => currentDate.value.getFullYear())
    const currentMonth = computed(() => currentDate.value.getMonth())

    const previousMonth = () => {
      currentDate.value.setMonth(currentDate.value.getMonth() - 1)
      currentDate.value = new Date(currentDate.value)
    }

    const nextMonth = () => {
      currentDate.value.setMonth(currentDate.value.getMonth() + 1)
      currentDate.value = new Date(currentDate.value)
    }

    const getCalendarDays = () => {
      const firstDay = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1)
      const lastDay = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 0)
      const daysInMonth = lastDay.getDate()
      const startDay = firstDay.getDay()

      const calendar = []
      let week = []

      for (let i = 0; i < startDay; i++) {
        week.push('')
      }

      for (let day = 1; day <= daysInMonth; day++) {
        week.push(day)
        if (week.length === 7) {
          calendar.push(week)
          week = []
        }
      }

      if (week.length > 0) {
        while (week.length < 7) {
          week.push('')
        }
        calendar.push(week)
      }

      return calendar
    }

    const calendar = computed(() => getCalendarDays())

    return {
      daysOfWeek,
      currentMonthName,
      currentYear,
      currentMonth,
      previousMonth,
      nextMonth,
      calendar
    }
  }
}
</script>

<style scoped>
.calendar-container {
  max-width: 600px;
  margin: 0 auto;
  font-family: 'Lato', sans-serif;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f2f2f2;
  border-radius: 5px;
  margin-bottom: 10px;
}

.calendar-header button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.calendar-header-info {
  text-align: center;
}

.calendar-month,
.calendar-year {
  display: block;
  font-size: 24px;
}

.calendar-table {
  width: 100%;
  border-collapse: collapse;
}

.calendar-table th,
.calendar-table td {
  width: 14.28%;
  text-align: center;
  padding: 10px;
  border: 1px solid #ddd;
  cursor: pointer;
}

.calendar-table th {
  background-color: #f9f9f9;
}

.calendar-table td.empty {
  background-color: #f2f2f2;
}

.calendar-table td.selected {
  background-color: #d4edda;
}

.appointments {
  margin-top: 20px;
}

.appointments h3 {
  margin-bottom: 10px;
}

.appointments ul {
  list-style: none;
  padding: 0;
}

.appointments li {
  background-color: #f9f9f9;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
}
.date-input {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  height: 50px;
  font-size: 1.5em;
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
