export default {
  state: {
    employees: [],
    errors: [],
    errorss: []
  },
  mutations: {
    setEmployees(state, employees) {
      state.employees = employees
      console.log(employees)
      console.log(state.employees)
    },
    adderrores(state, error) {
      state.errors.push(error)
    },
    updateerrores(state, error) {
      state.errorss.push(error)
    },
    addEmployee(state, employee) {
      state.employees.push(employee)
    },
    removeEmployee(state, employeeId) {
      state.employees = state.employees.filter((employee) => employee.id !== employeeId)
    },
    updateEmployee(state, updatedEmployee) {
      const index = state.employees.findIndex((employee) => employee.id === updatedEmployee.id)
      if (index !== -1) {
        state.employees.splice(index, 1, updatedEmployee)
      }
    }
  },
  actions: {
    async fetchEmployees(context) {
      const token = localStorage.getItem('aouth_token')
      await fetch('http://localhost:8000/api/admin/secrtaries', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => response.json())
        .then((data) => {
          context.commit('setEmployees', data.secrtaries || [])
          if (data.secrtaries && data.secrtaries.length > 0) {
            console.log(data.secrtaries[0].name)
          }
        })
    },
    async addEmployee(context, { name, email, password }) {
      const token = localStorage.getItem('aouth_token')
      try {
        const response = await fetch('http://localhost:8000/api/admin/add_secrtary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ name, email, password })
        })

        if (!response.ok) {
          const errorResponse = await response.json()

         
          context.commit('adderrores', JSON.parse(errorResponse))
          console.error('Network response was not ok:', errorResponse)
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        context.commit('addEmployee', data)
        console.log('Employee added:', data)
      } catch (error) {
        console.error('Add employee failed:', error)
      }
    },

    async deleteEmployee(context, employeeId) {
      const token = localStorage.getItem('aouth_token')
      try {
        const response = await fetch('http://localhost:8000/api/admin/delete_secrtary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ id: employeeId }) // تمرير المعرف ككائن
        })

        if (!response.ok) {
          const errorResponse = await response.text()
          console.error('Network response was not ok:', errorResponse)
          throw new Error('Network response was not ok')
        }

        context.commit('removeEmployee', employeeId)
        console.log('Employee deleted:', employeeId)
      } catch (error) {
        console.error('Delete employee failed:', error)
      }
    },
    async updateEmployee(context, { id, name, email, password }) {
      const token = localStorage.getItem('aouth_token')
      try {
        const response = await fetch(`http://localhost:8000/api/admin/update_secrtary`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ name, email, password, id })
        })

        if (!response.ok) {
          const errorResponse = await response.json()
          context.commit('updateerrores', JSON.parse(errorResponse))

          console.error('Network response was not ok:', errorResponse)
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        context.commit('updateEmployee', data)
        console.log('Employee updated:', data)
      } catch (error) {
        console.error('Update employee failed:', error)
      }
    }
  }
}
