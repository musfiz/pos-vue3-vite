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
    <div>
        <div class="p-4 bg-white rounded shadow-md" style="margin-top: 80px">
            <div class="row">
                <div class="col-lg-12 col-sm-6 col-xs-6">
                    <h2>Dashboard</h2>
                    <hr>
                </div>        
            </div>
            <div class="row  mb-4">
                <div class="col-sm">
                    <div class="card border-primary shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row g-0">
                                <div class="col">
                                    <div class="text-xs fw-bold text-primary text-uppercase mb-1">Sales Amount</div>
                                    <div class="h5 mb-0 fw-bold">10000 ৳</div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-calendar fa-3x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="card border-success shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row g-0">
                                <div class="col">
                                    <div class="text-xs fw-bold text-success text-uppercase mb-1">Purchase (Today)</div>
                                    <div class="h5 mb-0 fw-bold">5000 ৳</div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-dollar-sign fa-3x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="card border-warning shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row g-0">
                                <div class="col mr-2">
                                    <div class="text-xs fw-bold text-warning text-uppercase mb-1">Invoice (Today)</div>
                                    <div class="h5 mb-0 fw-bold">100</div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-clipboard-list fa-3x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="card border-info shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row g-0">
                                <div class="col mr-2">
                                    <div class="text-xs fw-bold text-info text-uppercase mb-1">Pending Requests</div>
                                    <div class="h5 mb-0 fw-bold">18</div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-comments fa-3x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row  mb-4">
                <div class="col-sm">
                    <div class="card shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <div class="text-xs fw-bold text-primary text-uppercase mb-1">Sales Amount</div>
                                    <div class="h5 mb-0 fw-bold">10000 ৳</div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-calendar fa-3x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="card shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <div class="text-xs fw-bold text-success text-uppercase mb-1">Purchase (Today)</div>
                                    <div class="h5 mb-0 fw-bold">5000 ৳</div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-dollar-sign fa-3x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="card border-left-info shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row g-0 align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs fw-bold text-warning text-uppercase mb-1">Invoice (Today)</div>
                                    <div class="h5 mb-0 fw-bold">100</div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-clipboard-list fa-3x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="card shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row g-0 align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs fw-bold text-danger text-uppercase mb-1">Pending Requests</div>
                                    <div class="h5 mb-0 fw-bold">18</div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-comments fa-3x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-2 mb-4">
                    <div class="card bg-primary text-white shadow">
                        <div class="card-body">
                            Primary
                            <div class="text-white-50 small">#4e73df</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 mb-4">
                    <div class="card bg-success text-white shadow">
                        <div class="card-body">
                            Success
                            <div class="text-white-50 small">#1cc88a</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 mb-4">
                    <div class="card bg-info text-white shadow">
                        <div class="card-body">
                            Info
                            <div class="text-white-50 small">#36b9cc</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 mb-4">
                    <div class="card bg-warning text-white shadow">
                        <div class="card-body">
                            Warning
                            <div class="text-white-50 small">#f6c23e</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 mb-4">
                    <div class="card bg-danger text-white shadow">
                        <div class="card-body">
                            Danger
                            <div class="text-white-50 small">#e74a3b</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 mb-4">
                    <div class="card bg-secondary text-white shadow">
                        <div class="card-body">
                            Secondary
                            <div class="text-white-50 small">#858796</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
</style>