<script lang="ts">
export default {
  data(){
    return {
      value: '',
      options: ['Select option', 'options', 'selected', 'multiple', 'label', 'searchable', 'clearOnSelect', 'hideSelected', 'maxHeight', 'allowEmpty', 'showLabels', 'onChange', 'touched']
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
                    <h5><i class="fa fa-plus-circle"></i> Edit Product</h5>
                    <router-link :to="{name: 'product.view'}" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View Product</router-link>
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
              <form action="" autocomplete="off">
                <div class="row">
                  <div class="col-4">
                      <label class="form-label">Category<span class="required">(*)</span></label>
                      <select class="form-select">
                          <option value="">Select Category</option>
                      </select>
                  </div>  
                  <div class="col-4">
                      <label class="form-label">Subcategory <span class="required">(*)</span></label>
                      <multiselect v-model="value" :options="options" placeholder="Select Subcategory"></multiselect>
                  </div>  
                  <div class="col-4">
                      <label class="form-label">Vendor<span class="required">(*)</span></label>
                      <select class="form-select">
                          <option value="">Select Vendor</option>
                      </select>
                  </div>    
                </div>                        
                <div class="row mt-3">
                  <div class="col-2">
                    <label class="form-label"> Code <span class="required">(*)</span></label>
                    <input type="text" class="form-control" placeholder="Code">
                  </div>  
                  <div class="col-2">
                    <label class="form-label"> Class Code <span class="required">(*)</span></label>
                    <input type="text" class="form-control" placeholder="Class Code">
                  </div>    
                  <div class="col">
                    <label class="form-label">Product Name <span class="required">(*)</span></label>
                    <input type="text" class="form-control" placeholder="Product Name">
                  </div>                           
                </div>                    
                <div class="row mt-3">
                  <div class="col-6 d-grid">
                    <button type="submit" class="btn btn-primary btn-block btn-radius"><i class="fas fa-hdd"></i> Update Product</button>
                  </div>
                  <div class="col-2 d-grid">
                    <a class="btn btn-success btn-radius" title="Refresh" @click="''"><i class="fas fa-refresh"></i></a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- row --> 
  </div>
</template>