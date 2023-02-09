<script lang="ts">
export default {
  data(){
    return {
    }
  }
}
</script>
<template>
    <div>
      <!-- row -->
      <div class="row">
        <div class="col">
            <div class="card border-secondary">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5><i class="fa fa-list"></i> View Stock</h5>
                    <router-link :to="{name: 'stock.add'}" class="btn btn-success btn-sm"><i class="fa fa-plus-circle"></i> Add Stock</router-link>
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
              <table class="table table-sm table-bordered table-striped resposive">
                  <thead class="text-center">
                      <tr>
                          <th colspan="4">Product Details</th>
                          <th colspan="3">Price</th>
                          <th colspan="2">Quantity</th>
                      </tr>                            
                  </thead>
                  <thead class="text-center">
                      <tr>
                          <th>SN</th>
                          <th>Code</th>
                          <th width="40%">Name</th>
                          <th>Variant</th>
                          <th>DP</th>
                          <th>TP</th>
                          <th>MRP</th>
                          <th>Current</th>
                          <th>Opening</th>
                      </tr>
                  </thead>
                  <tbody class="text-center">                      
                  </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- row -->
    </div>
</template>

<style scoped>

</style>

