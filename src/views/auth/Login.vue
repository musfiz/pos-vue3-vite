<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5">Smart POS</h2>
        <div class="text-center mb-5 text-dark">Login</div>
        <div class="card my-5">

          <form class="card-body cardbody-color p-lg-5">

            <div class="text-center">
              <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px" alt="profile">
            </div>

            <div class="mb-3">
              <input type="text" class="form-control" id="Username" aria-describedby="emailHelp"
                placeholder="User Name">
            </div>
            <div class="mb-3">
              <input type="password" class="form-control" id="password" placeholder="Password">
            </div>
            <div class="text-center"><button type="submit" class="btn btn-success px-5 mb-5 w-100">Login</button></div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import Auth from '../../Auth.js';
export default {
  data() {
      return {
          user:{},
          error: null
      }
  },
  methods: {
      handleSubmit(e) {
          e.preventDefault()
          if (this.user.password.length > 0) {
              this.axios.post('/api/login', this.user)
                  .then(({data}) => {
                      // Auth.login(data.access_token,data.user); //set local storage
                      // this.$router.push('/dashboard');
                      // this.$store.dispatch('login', data)
                      // this.$router.push({name: 'dashboard'})
                  })
                  .catch((error) => {
                      console.log(error);
                  });
          }
      },
  },
}
</script>
