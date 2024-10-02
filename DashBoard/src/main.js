import './assets/main.css'

import { createApp } from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'
import './assets/sb-admin-2.css'
import './assets/sb-admin-2.min.css'

// import Notiflix from 'notiflix'
import './assets/sb-admin-2.min.css'

import '@fortawesome/fontawesome-free/css/all.min.css'
const app = createApp(App)

app.use(router).use(store)

app.mount('#app')
