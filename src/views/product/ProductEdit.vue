<script lang="ts">
import { mapGetters } from 'vuex'
export default {
  data(){
    return {
        id: '',
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
        vendor: this.getVendor(),
        variant: [],
    }
  },
    methods: {
        ...mapGetters(['getCategory', 'getVendor']),

        onUpdate(e){
            e.preventDefault()
            let params:Object = {
                'id': this.id,
                'category_id': this.categoryId,
                'subcategory_id': this.selectedSubcategory ? this.selectedSubcategory.id : '',
                'vendor_id': this.vendorId,
                'code': this.code,
                'class_code': this.classCode,
                'product_name': this.productName,
                'variant_id': this.selectedVariant.map(obj => obj.id)
            }
            this.axios.put('product/'+ this.id, params)
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

        getVariant(){
          this.axios.get('common/variant/')
            .then(({data}) => {
                this.variant = data.data
            })
            .catch((error) => {
                console.log(error);                    
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

        getProduct(){
            this.axios.get('product/'+ this.id)
                .then(({data}) => {
                    const product = data.data
                    this.categoryId = product.category_id
                    if(this.categoryId){
                        this.onChangeCategory()
                    }
                    this.selectedSubcategory = product.subcategory
                    this.vendorId = product.vendor_id
                    this.code = product.code
                    this.classCode = product.class_code
                    this.productName = product.product_name
                    product.product_variant.forEach((obj) => {
                      this.selectedVariant.push(obj.variant)
                    })
                })
                .catch(({response}) => {
                    console.log(response);                    
                })
        },

        onRefresh(){
            this.categoryIdError = ''
            this.subcategoryError = ''
            this.vendorIdError = ''
            this.productNameError = ''
        }
    },
    mounted(){       
        this.id = this.$route.params.id
        this.getProduct()
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
              <form autocomplete="off" @submit="onUpdate">
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
                    <button type="submit" class="btn btn-primary btn-block btn-flat"><i class="fas fa-hdd"></i> Update Product</button>
                  </div>
                  <!-- <div class="col-2 d-grid">
                    <a class="btn btn-success btn-flat" title="Refresh" @click="onRefresh"><i class="fas fa-refresh"></i></a>
                  </div> -->
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- row --> 
  </div>
</template>