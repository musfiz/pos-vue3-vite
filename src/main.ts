import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.min.css"
import './style.css'

import App from './App.vue'
import router from './router'

import store from './store'

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
// import { fab } from '@fortawesome/free-brands-svg-icons'
// library.add(fab)
// import { far } from '@fortawesome/free-regular-svg-icons'
// library.add(far)
import { dom } from "@fortawesome/fontawesome-svg-core"
dom.watch();

import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'

import axios from './helper/axios'
import VueAxios from 'vue-axios'
import cookies from 'vue3-cookies'

import Vue3Toastify, { toast , type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'


const app = createApp(App)

app.use(Vue3Toastify, {
  autoClose: 2000,
  theme: 'colored',
  dangerouslyHTMLString: true,
  multiple: false
} as ToastContainerOptions)

app.use(VueSweetalert2)

app.config.globalProperties.toast = toast

app.component('font-awsome-icon', FontAwesomeIcon)
app.component('Multiselect', Multiselect)
app.use(router)
app.use(store)
app.use(VueAxios, axios)
app.use(cookies, {expireTimes: '2d', secure: true, sameSite: "None"})
app.mount('#app')

import "bootstrap/dist/js/bootstrap.js"
