import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()
import axios from 'axios'

export const commonStore = {
  state: ()=>({
    category: cookies.get('category') || [],
    vendor: cookies.get('vendor') || []
  }),

  mutations:{
    SET_CATEGORY(state, payload){
      cookies.set('category', JSON.stringify(payload))
      state.category = JSON.stringify(payload)
    },
    SET_VENDOR(state, payload){
      cookies.set('vendor', JSON.stringify(payload));
      state.vendor = JSON.stringify(payload)
    }
  },

  actions: {
    category(context){
      axios.get('common/category')
        .then(({data}) => {
          context.commit('SET_CATEGORY', data.data)
        })
        .catch((error) => {
            console.log(error);
        })
    },
    vendor(context){
      axios.get('common/vendor')
      .then(({data}) => {
        context.commit('SET_VENDOR', data.data)
      })
      .catch((error) => {
          console.log(error);
      })
    }
  },  

  getters: {
    getCategory(state){
      return JSON.parse(state.category)
    },
    getVendor(state){
      return JSON.parse(state.vendor)
    }
  }
}
