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
        selectedVariant: [],
        categoryIdError: '',
        subcategoryError: '',
        vendorIdError: '',
        productNameError: '',
        variantError: '',
        category: this.getCategory(),
        subcategory: [],
        variant: [],
        vendor: this.getVendor()
    }
  },
    methods: {
        ...mapGetters(['getCategory', 'getVendor']),

        onSubmit(e){
            e.preventDefault()
            let params:Object = {
                'category_id': this.categoryId,
                'subcategory_id': this.selectedSubcategory.id,
                'vendor_id': this.vendorId,
                'code': this.code,
                'class_code': this.classCode,
                'product_name': this.productName,
                'variant_id': this.selectedVariant.map(obj => obj.id)
            }
            
            this.axios.post('product', params)
                .then(({data}) => {
                    this.toast.success(data.message)
                    this.onRefresh()
                })
                .catch(({response}) => {
                    this.categoryIdError = response.data.errors.category_id ? response.data.errors.category_id[0] : ''
                    this.subcategoryError = response.data.errors.subcategory_id ? response.data.errors.subcategory_id[0] :''
                    this.vendorIdError = response.data.errors.vendor_id ? response.data.errors.vendor_id[0] :''
                    this.productNameError = response.data.errors.product_name ? response.data.errors.product_name[0] :''
                    this.variantError = response.data.errors.variant_id ? response.data.errors.variant_id[0] :''
                })
        },

        onChangeCategory(){
            this.axios.get('common/subcategory/'+ this.categoryId)
                .then(({data}) => {
                    this.subcategory = data.data
                })
                .catch((error) => {
                    console.log(error);                    
                })
        },

        getVariant(){
          this.axios.get('common/variant/')
            .then(({data}) => {
                this.variant = data.data
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
            this.selectedVariant = []
            this.categoryIdError = ''
            this.subcategoryError = ''
            this.vendorIdError = ''
            this.productNameError = ''
            this.variantError = ''
        }
    },
    mounted(){
      this.getVariant()
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
                      <select class="form-select" :class="{'is-invalid': categoryIdError}" v-model="categoryId" @change="onChangeCategory">
                          <option value="">Select Category</option>
                          <option v-for="item in category" :key="item.id" :value="item.id">{{ item.category_name }}</option>
                      </select>
                      <div class="invalid-feedback">{{ categoryIdError }}</div> 
                  </div>  
                  <div class="col-4">
                        <label class="form-label">Subcategory <span class="required">(*)</span></label>                        
                        <multiselect v-model="selectedSubcategory" :class="{'invalid': subcategoryError}" :options="subcategory" placeholder="Select subcategory" label="subcategory_name"></multiselect>
                        <span class="typo__label">{{ subcategoryError }}</span>                        
                  </div>  
                  <div class="col-4">
                      <label class="form-label">Vendor <span class="required">(*)</span></label>
                      <select class="form-select" :class="{'is-invalid': vendorIdError}" v-model="vendorId">
                          <option value="">Select Vendor</option>
                          <option v-for="item in vendor" :key="item.id" :value="item.id">{{ item.vendor_name }}</option>
                      </select>
                      <div class="invalid-feedback">{{ vendorIdError }}</div> 
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
                    <input type="text" class="form-control" :class="{'is-invalid': productNameError}"  placeholder="Product Name" v-model="productName">
                    <div class="invalid-feedback">{{ productNameError }}</div> 
                  </div>                           
                </div>    

                <div class="row mt-3">
                  <div class="col-4">
                    <label class="form-label"> Variant <span class="required">(*)</span></label>                        
                    <multiselect 
                        track-by="id"
                        v-model="selectedVariant" 
                        :class="{'invalid': variantError}" 
                        :options="variant" 
                        placeholder="Select Variant" 
                        label="variant_name" 
                        :multiple="true" 
                        :close-on-select="true"
                    >
                    </multiselect>
                    <span class="typo__label">{{ variantError }}</span>                        
                  </div> 
                </div>  
                               
                <div class="row mt-3">
                  <div class="col-6 d-grid">
                    <button type="submit" class="btn btn-primary btn-block btn-flat"><i class="fas fa-hdd"></i> Store Product</button>
                  </div>
                  <div class="col-2 d-grid">
                    <a class="btn btn-success btn-flat" title="Refresh" @click="onRefresh"><i class="fas fa-refresh"></i></a>
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