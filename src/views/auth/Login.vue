<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">        
          <div class="card" style="margin-top: 6rem">
            <form class="card-body cardbody-color p-lg-5">
              <h2 class="text-center text-dark my-3">Smart POS</h2>
              <!-- <div class="text-center text-dark mb-3">Login</div> -->
              <!-- <div class="text-center">
                <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" class=" my-3"
                  width="200px" alt="profile">
              </div> -->

              <div class="input-group mb-3">
                <span class="input-group-text" id="email">Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input type="text" class="form-control" aria-describedby="email" placeholder="Enter email or username" v-model="user.email">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="password">Password</span>
                <input type="password" class="form-control" placeholder="Enter password" v-model="user.password">
              </div>
              <div class="mb-2">
                <input class="form-check-input" type="checkbox" value="" id="checkbox"> Remember Me
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-success px-5 mb-5 w-100" style="border-radius: 0;" @click="handleSubmit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 offset-md-3 text-center mt-5">
          <h5>Howlader Electric</h5>
          <h6>Bottola Shariatpur.</h6>
          <p class=""></p>
          <h6>Developed By <a href="">Mustafizur Rahman</a></h6>
        </div>
      </div>
    </div>
  </div> 
</template>

<script lang="ts">
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      user:{
        'email': 'admin@mail.com',
        'password': 'admin365'
      },
      error: [],
    }
  },
  methods: {
    ...mapActions(['login']),
    handleSubmit(e) {
      e.preventDefault()
      this.axios.post('/login', this.user)
        .then(({data}) => {
          this.toast.success('<strong>'+ data.message +'</strong>', {autoClose: 2000})
          setTimeout(() => {            
            this.login(data.data)
          }, 3000)          
        })
        .catch(({response}) => {
          this.toast.error('<strong>'+response.data.message+'</strong>')
        });
    }
  },
}
</script>
