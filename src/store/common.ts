import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()
import axios from 'axios'

export const commonStore = {
  state: ()=>({
    category: [],
    vendor: []
  }),

  mutations:{
    SET_CATEGORY(state, payload){
      state.category = payload
    },
    SET_VENDOR(state, payload){
      state.vendor = payload
    }
  },

  actions: {
    getAllcategory(context, payload){
      
      context.commit('SET_CATEGORY', payload)
    },
    getAllVendor(context, payload){

    }
  },  

  getters: {
    getCategory(state){
      return state.category
    },
    getVendor(state){
      return state.vendor
    }
  }
}
