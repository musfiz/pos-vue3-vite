<script setup lang="ts">
</script>

<template>
  <div>
    <main role="main" class="container-xxl">
      <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <div class="container-fluid">
          <router-link class="navbar-brand" to="/"><i class="fas fa-store-alt"></i> Smart POS</router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="navbar-collapse offcanvas-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav" style="margin-left: auto !important">
              <li class="nav-item active"> 
                <router-link class="nav-link" to="/"><i class="fas fa-tachometer-alt"></i> Dashboard</router-link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fas fa-layer-group"></i> Stock
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown1">
                  <li><router-link class="dropdown-item" to="/"><i class="fas fa-layer-group"></i> View Stock</router-link></li>
                  <li><router-link class="dropdown-item" to="/"><i class="fas fa-info-circle"></i> View Stock Details</router-link></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><router-link class="dropdown-item" to="/"><i class="fas fa-cubes"></i> Stock Adjust (Sales)</router-link></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fab fa-product-hunt"></i> Product
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown1">
                  <li><router-link class="dropdown-item" to="/"><i class="fas fa-plus"></i> Category</router-link></li>
                  <li><router-link class="dropdown-item" to="/"><i class="fas fa-plus"></i> Subcategory</router-link></li>
                  <li><router-link class="dropdown-item" to="/"><i class="fas fa-plus-circle"></i> Product Vendor</router-link></li>
                  <li><router-link class="dropdown-item" to="/"><i class="fas fa-stream"></i> Product Variant</router-link></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><router-link class="dropdown-item" to="/"><i class="fas fa-list"></i> Product List</router-link></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fas fa-cash-register"></i> Register
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown1">
                  <li><router-link class="dropdown-item" to="/"><i class="fas fa-credit-card"></i> Sales Register</router-link></li>
                  <li><router-link class="dropdown-item" to="/"><i class="fas fa-money-check-alt"></i> Purchase Register</router-link></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fas fa-users"></i> Client
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown1">
                  <li><router-link class="dropdown-item" to="/"><i class="fas fa-user-alt"></i> Customer</router-link></li>
                  <li><router-link class="dropdown-item" to="/"><i class="fas fa-user-check"></i> Supplier</router-link></li>
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
                  <li><router-link class="dropdown-item" to="/login"><i class="fas fa-database"></i> Logout</router-link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="p-4 bg-white rounded shadow-md" style="margin-top: 70px">
        <router-view/>        
      </div>
    </main>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.bg-dark{
    background-color: #295786 !important;
  }
.bg-light{
    background-color: #5b5c5c !important;
}
.navbar{

}
.nav-item .nav-link {
  color: #f8f9fa;
}
</style>
