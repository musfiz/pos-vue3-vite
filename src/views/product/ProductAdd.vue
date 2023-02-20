<script lang="ts">
import { mapGetters } from 'vuex'
export default {
  data(){
    return {
        categoryId: '',
        selectedSubcategory: '',
        vendorId: '',
        code:'',
        classCode:'',
        productName: '',
        categoryIdError: '',
        subcategoryIdError: '',
        vendorIdError: '',
        productNameError: '',
        category: this.getCategory(),
        subcategory: [],
        vendor: this.getVendor(),
        isInvalid: false
    }
  },
    methods: {
        ...mapGetters(['getCategory', 'getVendor']),

        onSubmit(e){
            e.preventDefault()
            let params:Object = {
                'category_id': this.categoryId,
                'subcategory_id': this.selectedSubcategory,
                'vendor_id': this.vendorId,
                'code': this.code,
                'classCode': this.classCode,
                'productName': this.productName
            }
            this.axios.post('product', params)
                .then(({data}) => {
                    this.toast.success(data.message)
                    this.onRefresh()
                })
                .catch(({response}) => {
                    this.categoryIdError = response.data.errors.category_id ? response.data.errors.category_id[0] : ''
                    this.subcategoryIdError = response.data.errors.subcategory_id ? response.data.errors.subcategory_id[0] :''
                })
        },

        onCategoryChange(){
            this.axios.get('common/subcategory/'+ this.categoryId)
                .then(({data}) => {
                    this.subcategory = data.data
                })
                .catch((error) => {
                    console.log(error);
                    
                })
        },

        onRefresh(){
            this.categoryId = ''
            this.selectedSubcategory = ''
            this.vendorId = ''
            this.code = ''
            this.classCode = ''
            this.productName = ''
            this.categoryIdError = ''
            this.subcategoryIdError = ''
            this.vendorIdError = ''
            this.productNameError = ''
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
                    <h5><i class="fa fa-plus-circle"></i> Add Product</h5>
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
              <form autocomplete="off" @submit="onSubmit">
                <div class="row">
                  <div class="col-4">
                      <label class="form-label">Category <span class="required">(*)</span></label>
                      <select class="form-select" v-model="categoryId" @change="onCategoryChange">
                          <option value="">Select Category</option>
                          <option v-for="item in category" :key="item.id" :value="item.id">{{ item.category_name }}</option>
                      </select>
                  </div>  
                  <div class="col-4">
                        <label class="form-label">Subcategory <span class="required">(*)</span></label>
                        
                            <multiselect class="invalid" :value="selectedSubcategory" :options="subcategory" placeholder="Select subcategory" label="subcategory_name" :allow-empty="required"></multiselect>
                            <label class="typo__label form__label" :v-show="isInvalid">Must have at least one value</label>
                        
                  </div>  
                  <div class="col-4">
                      <label class="form-label">Vendor <span class="required">(*)</span></label>
                      <select class="form-select" v-model="vendorId">
                          <option value="">Select Vendor</option>
                          <option v-for="item in vendor" :key="item.id" :value="item.id">{{ item.vendor_name }}</option>
                      </select>
                  </div>    
                </div>                        
                <div class="row mt-3">
                  <div class="col-2">
                    <label class="form-label"> Code</label>
                    <input type="text" class="form-control" placeholder="Code" v-model="code">
                  </div>  
                  <div class="col-2">
                    <label class="form-label"> Class Code </label>
                    <input type="text" class="form-control" placeholder="Class Code" v-model="classCode">
                  </div>    
                  <div class="col">
                    <label class="form-label">Product Name <span class="required">(*)</span></label>
                    <input type="text" class="form-control" placeholder="Product Name" v-model="productName">
                  </div>                           
                </div>                    
                <div class="row mt-3">
                  <div class="col-6 d-grid">
                    <button type="submit" class="btn btn-primary btn-block btn-radius"><i class="fas fa-hdd"></i> Store Product</button>
                  </div>
                  <div class="col-2 d-grid">
                    <a class="btn btn-success btn-radius" title="Refresh" @click="onRefresh"><i class="fas fa-refresh"></i></a>
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