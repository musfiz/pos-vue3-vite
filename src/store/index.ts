import {createStore} from 'vuex'
import {authStore} from './auth'
import {commonStore} from './common'

const store = createStore({
    modules:{
      authStore,
      commonStore
    }
})

export default store
