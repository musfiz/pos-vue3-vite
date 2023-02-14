export const authStore = {
  state: ()=>({
      authStatus: false, //check status if user logged in or not
      authUser: {}, // check auth user information
      isLayout: 'Login'
  }),

  mutations:{
    updateLogin(state, payload){
      state.authUser = payload.user
      state.authStatus = true
      // Store token to cookies
    },

    updateLogout(state, payload){
      state.authUser = {}
      state.authStatus = false
      //Removing token from cookie
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
    isLoggedIn(state){
      return state.authStatus
    },

    authUser(state){
      return state.authUser
    },

    isLayout(state){
      return state.isLayout
    }
  }
}
