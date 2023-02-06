import { createRouter, createWebHistory } from "vue-router";

import Login from '../views/auth/Login.vue';
import Index from '../views/layouts/Index.vue';
const routes = [
  {
    path: "/",
    name: "Home",
    component: Index
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router