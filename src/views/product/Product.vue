<template>
  <div>
    <!-- row -->
    <div class="row">
        <div class="col">
            <div class="card border-secondary">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5><i class="fa fa-list"></i> Product</h5>
                    <router-link :to="{name: 'product.add'}" class="btn btn-success btn-sm"><i class="fa fa-plus-circle"></i> Add Product</router-link>
                    <!-- <router-link :to="{name: 'product.csv.add'}" class="btn btn-info btn-sm"><i class="fa fa-plus-circle"></i> Add Product By CSV</router-link> -->
                </div>
            </div>
        </div>
    </div>
    <!-- row -->
     <!-- row -->  
     <div class="row mt-2">
        <div class="col">
          <div class="card">
            <div class="card-body">
              
            </div>
          </div>
        </div>
      </div>
      <!-- row --> 
  </div>
</template>