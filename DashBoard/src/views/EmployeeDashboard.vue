<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <div id="wrapper" class="flex">
    <ul
      class="navbar-nav bg-[#085f63] sidebar sidebar-dark accordion min-h-screen"
      id="accordionSidebar"
    >
      <a class="sidebar-brand d-flex align-items-center justify-content-center py-4">
        <div class="sidebar-brand-icon rotate-n-15 text-[#f1345d]">
          <i class="fas fa-laugh-wink"></i>
        </div>
        <div class="sidebar-brand-text mx-3">Employee Dashboard</div>
      </a>

      <hr class="sidebar-divider my-0" />

      <li class="nav-item">
        <a class="nav-link">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </a>
      </li>

      <hr class="sidebar-divider" />

      <div class="sidebar-heading text-gray-300">Appointmen</div>

      <li class="nav-item">
        <router-link to="/employee/MangeAppointment" class="nav-link collapsed">
          <i class="fas fa-fw fa-cog"></i>
          <span>MangeAppointment</span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link to="/employee/ListAppointment" class="nav-link">
          <i class="fas fa-fw fa-wrench"></i>
          <span>ListAppointment</span>
        </router-link>
      </li>

      <hr class="sidebar-divider d-none d-md-block" />
    </ul>

    <div id="content-wrapper" class="flex flex-col w-full">
      <div id="content">
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
            <i class="fa fa-bars"></i>
          </button>

          <form
            class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search"
          >

          </form>
        </nav>

        <!-- Main Content Here -->
        <div class="container mx-auto p-4">
          <!-- Add your main content here -->
        </div>
      </div>
      <router-view></router-view>
      <footer class="bg-white text-center py-4 shadow">
        <div class="container">
          <span class="text-gray-600">Copyright © Beauty Clinic</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard'
}
</script>

<style scoped>
.sidebar {
  background-color: #085f63;
}
.sidebar .nav-link {
  color: #ffffff;
}
.sidebar .nav-link:hover {
  background-color: #064d4f;
}
.sidebar .sidebar-heading {
  color: #d1d5db;
}
.topbar {
  background-color: #ffffff;
}
.topbar .navbar-search .input-group-append button {
  background-color: #085f63;
}
.topbar .navbar-search .input-group-append button:hover {
  background-color: #064d4f;
}
</style>
