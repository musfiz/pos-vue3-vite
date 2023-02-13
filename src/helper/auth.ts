import axios from 'axios';

class Auth {
    protected token:string
    protected user:object
    constructor () {
      let userToken = window.localStorage.getItem('token')
      this.token = userToken ? userToken : ''
      let userData = window.localStorage.getItem('user')
      this.user = userData ? JSON.parse(userData) : null
      if (this.token) {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token
      }
    }
    login (token:string, user:object) {
      window.localStorage.setItem('token', token)
      window.localStorage.setItem('user', JSON.stringify(user))
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      this.token = token
      this.user = user
    }
    check () {
      return !! this.token;
    }
    logout () {
      // window.localStorage.clear();
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('user');
      this.user = {};
    }
}
export default new Auth();