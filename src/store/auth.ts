import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()
import axios from 'axios'

export const authStore = {
  state: ()=>({
    isAuth: cookies.get('isAuth') || false,
    isLayout: cookies.get('isLayout') || 'Login',
    authUser: cookies.get('user') || {} // check auth user information
  }),

  mutations:{
    updateLogin(state, payload){      
      // Store token to cookies
      cookies.set('isAuth', 'true')
      cookies.set('isLayout', 'Index')
      cookies.set('user', payload.user);
      cookies.set('token', payload.token);

      state.isAuth = true
      state.isLayout = 'Index'
      state.authUser = payload.user
      axios.defaults.headers.common['Authorization'] = 'Bearer '+ payload.token
    },

    updateLogout(state, payload){
      state.authUser = payload
      state.isAuth = false
      state.isLayout = 'Login'
      //Removing token from cookie
      cookies.remove('isAuth')
      cookies.remove('isLayout')
      cookies.remove('user')
      cookies.remove('token')
      cookies.remove('category')
      cookies.remove('vendor');
    },

    updateLayout(state, payload){
      state.isLayout = payload
    }
  },

  actions: {
    login(context, payload){
      context.commit('updateLogin', payload)
    },

    logout(context, payload){
      context.commit('updateLogout', payload)
    },

    setLayout(context, payload){
      context.commit('updateLayout', payload)
    },
  },  

  getters: {
    isAuth(state){
      return state.isAuth
    },

    authUser(state){
      return state.authUser
    },

    isLayout(state){
      return state.isLayout
    }
  }
}
