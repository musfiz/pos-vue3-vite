<script lang="ts">
export default {
  props:{},
  components: {},
  data(){
    return {
      
    }
  }
}
</script>

<template>
   <main role="main" class="container">
    <div class="row-height p-3 my-3 bg-white rounded shadow-md">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-sm-6 col-xs-6">
              <h2>Dashboard</h2>
              <hr>
          </div>
          <div class="row">

            <!-- Earnings (Monthly) Card Example -->
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card text-dark mb-3">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                      <div class="col">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Sales Amount</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">10000 ৳</div>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-calendar fa-2x text-gray-300"></i>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card text-dark mb-3">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                      <div class="col">
                        <div class="text-xs fw-bold text-primary text-uppercase mb-1">Sales Amount</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">10000 ৳</div>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-calendar fa-2x text-gray-300"></i>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card text-dark mb-3">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                      <div class="col">
                        <div class="text-xs fw-bold text-success text-uppercase mb-1">Sales Amount</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">10000 ৳</div>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-calendar fa-2x text-gray-300"></i>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style lang="scss">
</style>