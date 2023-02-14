import axios from 'axios';
import { useCookies } from 'vue3-cookies'
axios.defaults.baseURL = import.meta.env.VITE_API_URL

const { cookies } = useCookies()
let token:string = cookies.get('token')
if(token){  
  axios.defaults.headers.common['Authorization'] = 'Bearer '+ token
}

export default axios;