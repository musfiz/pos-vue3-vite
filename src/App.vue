<script setup lang="ts">
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <a class="navbar-brand mr-auto mr-lg-0" href="#"><i class="fas fa-store"></i> Smart POS</a>
      <button class="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas"> <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active"> <a class="nav-link" href=""><i class="fas fa-tachometer-alt"></i> Dashboard <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item dropdown"> 
            <a class="nav-link dropdown-toggle" href="javascript:void()" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-layer-group"></i> Stock</a>
            <div class="dropdown-menu" aria-labelledby="dropdown01"> 
              <a class="dropdown-item" href=""><i class="fas fa-database"></i> View Stock</a>
              <a class="dropdown-item" href=""><i class="fas fa-database"></i> View Stock Details</a>
              <div role="separator" class="dropdown-divider"></div> 
              <a class="dropdown-item" href=""><i class="fas fa-database"></i> Stock Adjust (Sales)</a>
            </div>
          </li>
          <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="javascript:void()" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fab fa-product-hunt"></i> Product</a>
            <div class="dropdown-menu" aria-labelledby="dropdown01"> <a class="dropdown-item" href=""><i class="fas fa-check"></i> Category</a>
              <a class="dropdown-item" href=""><i class="fas fa-check"></i> Subcategory</a>  <a class="dropdown-item" href=""><i class="fas fa-check"></i> Product Vendor</a>  
              <a class="dropdown-item" href=""><i class="fas fa-check"></i> Product Variant</a> 
              <div role="separator" class="dropdown-divider"></div> <a class="dropdown-item" href=""><i class="fas fa-check"></i> Prouduct List</a>
            </div>
          </li>
          <li class="nav-item dropdown"> 
            <a class="nav-link dropdown-toggle" href="javascript:void()" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-hand-holding-usd"></i> Register</a>
            <div class="dropdown-menu" aria-labelledby="dropdown01"> 
              <a class="dropdown-item" href=""><i class="far fa-money-bill-alt"></i> Sales Register</a>
              <a class="dropdown-item" href=""><i class="fa fa-credit-card"></i> Purchase Register</a> 
            </div>
          </li>
          <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="javascript:void()" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-users"></i> Client</a>
            <div class="dropdown-menu" aria-labelledby="dropdown01">	
              <a class="dropdown-item" href=""><i class="fas fa-list"></i> Customer List</a> 
              <a class="dropdown-item" href=""><i class="fas fa-list"></i> Supplier List</a> 
            </div>
          </li>
          <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="javascript:void()" id="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-history"></i> History</a>
            <div class="dropdown-menu" aria-labelledby="dropdown">	<a class="dropdown-item" href="#"><i class="fas fa-exchange-alt"></i> Transaction History</a> 
            </div>
          </li>
          <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="javascript:void()" id="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-user"></i>  Auth::user()->name </a>
            <div class="dropdown-menu" aria-labelledby="dropdown">	<a class="dropdown-item" href="#"><i class="fas fa-info-circle"></i> Profile</a>
              <a class="dropdown-item" href=""><i class="fa fa-comment"></i> Feedback</a>
              <div role="separator" class="dropdown-divider"></div> <a class="dropdown-item" href=""><i class="fas fa-database"></i> Database Backup</a>
              <div role="separator" class="dropdown-divider"></div>
              <a class="dropdown-item" href="" onclick="event.preventDefault();
                                            document.getElementById('logout-form').submit();"> <i class="fas fa-sign-out-alt"></i></a>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Nav in VUE -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Smart POS</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item active"> 
              <a class="nav-link" href=""><i class="fas fa-tachometer-alt"></i> Dashboard <span class="sr-only"></span></a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Stock
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown1">
                <li><a class="dropdown-item" href="#"><i class="fas fa-database"></i> View Stock</a></li>
                <li><a class="dropdown-item" href="#"><i class="fas fa-database"></i> View Stock Details</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#"><i class="fas fa-database"></i> Stock Adjust (Sales)</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li>
          </ul>
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
    <router-view/>
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
    background-color: #f8f9fa !important;
}
.nav-item .nav-link {
  color: hsla(0, 0%, 100%, 0.73);
}
</style>
