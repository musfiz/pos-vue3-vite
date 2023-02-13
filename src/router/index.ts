import { createRouter, createWebHistory } from "vue-router";
import routes from './router'
import Auth from '../helper/auth'


const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) ) {
      if (Auth.check()) {
          next();
          return;
      } else {
          router.push('/login');
      }
  } else {
      next();
  }
});

export default router