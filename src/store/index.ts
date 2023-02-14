import {createStore} from 'vuex'
import {authStore} from './auth'

const store = createStore({
    modules:{
      authStore
    }
})

export default store
