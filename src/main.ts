import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.min.css"
import './style.css'

import App from './App.vue'
import router from './router'

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

import axios from 'axios'
import VueAxios from 'vue-axios'


const app = createApp(App)
app.component('font-awsome-icon', FontAwesomeIcon)
app.use(router)
app.use(VueAxios, axios)
app.mount('#app')

import "bootstrap/dist/js/bootstrap.js"
