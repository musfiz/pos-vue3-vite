<script lang="ts">
export default {
  methods: {
    logout(){
      this.axios.post('/logout')
        .then(({data}) => {          
          this.$store.dispatch('logout', {})  
          this.toast.info('<strong>'+ data.message +'</strong>')        
          // console.log(data)
        })
        .catch(({response}) => {
          if(response.status == 401){
            this.$store.dispatch('logout', {})  
          }else{
            this.toast.error('<strong>Something went wrong !</strong>')
          }
        });
    }
  }
}
</script>
<template>
  <div>
    <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <div class="container-fluid">
          <router-link class="navbar-brand" to="/"><i class="fas fa-store-alt"></i> Smart POS</router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="navbar-collapse offcanvas-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav" style="margin-left: auto !important">
              <li class="nav-item active"> 
                <router-link class="nav-link" :to="{name: 'home'}"><i class="fas fa-tachometer-alt"></i> Dashboard</router-link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fab fa-product-hunt"></i> Product
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown1">
                  <li><router-link class="dropdown-item" :to="{name: 'category.view'}"><i class="fas fa-check"></i> Category</router-link></li>
                  <li><router-link class="dropdown-item" :to="{name: 'subcategory.view'}"><i class="fas fa-check-double"></i> Subcategory</router-link></li>
                  <li><router-link class="dropdown-item" :to="{name: 'vendor.view'}"><i class="fas fa-check-circle"></i> Vendor</router-link></li>
                  <li><router-link class="dropdown-item" :to="{name: 'variant.view'}"><i class="fas fa-list"></i> Variant</router-link></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><router-link class="dropdown-item" :to="{name: 'product.view'}"><i class="fas fa-th-large"></i> Product Variant</router-link></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><router-link class="dropdown-item" :to="{name: 'product.view'}"><i class="fas fa-th"></i> Product List</router-link></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fas fa-users"></i> Client
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown1">
                  <li><router-link class="dropdown-item" :to="{name: 'customer.view'}"><i class="fas fa-user-alt"></i> Customer List</router-link></li>
                  <li><router-link class="dropdown-item" :to="{name: 'supplier.view'}"><i class="fas fa-user-check"></i> Supplier List</router-link></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fas fa-layer-group"></i> Stock
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown1">
                  <li><router-link class="dropdown-item" :to="{name: 'stock.view'}"><i class="fas fa-layer-group"></i> View Stock</router-link></li>
                  <li><router-link class="dropdown-item" to="/"><i class="fas fa-info-circle"></i> View Stock Details</router-link></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><router-link class="dropdown-item" to="/"><i class="fas fa-cubes"></i> Stock Adjust (Sales)</router-link></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fas fa-cash-register"></i> Register
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown1">
                  <li><router-link class="dropdown-item" :to="{name: 'register.sales'}"><i class="fas fa-credit-card"></i> Sales Register</router-link></li>
                  <li><router-link class="dropdown-item" :to="{name: 'register.sales'}"><i class="fas fa-redo"></i> Sales Return</router-link></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><router-link class="dropdown-item" :to="{name: 'register.purchase'}"><i class="fas fa-money-check-alt"></i> Purchase Register</router-link></li>
                  <li><router-link class="dropdown-item" :to="{name: 'register.purchase'}"><i class="fas fa-store-slash"></i> Purchase Return</router-link></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fas fa-history"></i> History
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown1">
                  <li><router-link class="dropdown-item" to="/"><i class="fas fa-hand-holding-usd"></i> Transaction History</router-link></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fas fa-user-circle"></i> Mustafizur Rahman
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown1">
                  <li><router-link class="dropdown-item" to="/"><i class="fas fa-id-badge"></i> Profile</router-link></li>
                  <li><router-link class="dropdown-item" to="/"><i class="fas fa-comment-alt"></i> Feedback</router-link></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><router-link class="dropdown-item" to="/"><i class="fas fa-database"></i> DB Backup</router-link></li>
                  <li><router-link class="dropdown-item" to="/"><i class="fas fa-upload"></i> DB Restore</router-link></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="javascript:void(0)" @click="logout"><i class="fas fa-database"></i> Logout</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  </div>
</template>