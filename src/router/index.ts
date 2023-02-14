import { createRouter, createWebHistory } from "vue-router";
import routes from './router'



const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) ) {
    next()
    return
      // if (Auth.check()) {
      //     next();
      //     return;
      // } else {
      //     router.push('/login');
      // }
  } else {
      next();
  }
});

export default router