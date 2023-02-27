<script lang="ts">import Typeahead from 'vue3-simple-typeahead'
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css' //Optional default CSS
export default {
  components: { Typeahead },
  data(){
    return {
        stock: [],
        products: [],
        productId: '',
        productName: '',
        productVariant: [],
        productVariantIds: [],
    }
  },
  methods: {
    projectedItem(item){
        return item.name +' ('+ item.code +')'
    },
    onSelectedItem(item){
        this.productId = item.id
        this.productName = item.name
        this.productVariantIds = item.product_variant.map(obj => obj.id)
    },
    onInput(item){
        const params = {
            'query': item.input
        }
        this.axios.get('common/product/search', { params })
            .then(({data}) => {
                this.products = data.data
            })
            .catch(({response}) => {
                console.log(response);                
            })
    },
    showStock(){
        if(!this.productId){
        this.toast.error('<strong> Select a product for creating stock.</strong>')
      }else{
        const params = {
          'product_id': this.productId,
          'product_name': this.productName,
        }
        this.$router.replace({name: 'stock.view', query: params})
        this.generateList()
      }
    },
    generateList(){
      this.axios.get('stock', {params: {'product_id': this.productId}})
        .then(({data}) => {
            this.stock = data.data
        })
        .catch(({response}) => {
            console.log(response);                
        })
    },
    onRefresh(){
      this.$router.replace({name: 'stock.view'})
      this.productId = ''
      this.productName = ''
      this.products = []
      this.$refs.inputRef.clearInput()      
    }
  },
  mounted(){
    if(this.$route.query.product_id){
      this.productId = this.$route.query.product_id
      this.productName = this.$route.query.product_name
      this.$refs.inputRef.input = this.$route.query.product_name
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
                        <div class="row">                       
                            <div class="col">
                                <label class="form-label">Type Product Name or Product Code <span class="required">(*)</span></label>
                                <typeahead 
                                class="form-control"
                                ref="inputRef"
                                placeholder="Type Anything..."
                                :items="products"
                                :minInputLength="1" 
                                :itemProjection="projectedItem"
                                @selectItem="onSelectedItem"    
                                @onInput="onInput"                                       
                                ></typeahead>
                                <!-- <div class="custom-invalid-feedback">{{selectedProductError}}</div>  -->
                            </div>
                            <div class="col g-0" style="margin-top: 31px">
                                <button type="submit" class="btn btn-primary btn-flat" @click="showStock"><i class="fas fa-list"></i> Show Stock</button> &nbsp;
                                <a class="btn btn-secondary btn-flat text-white ml-2" @click="onRefresh"><i class="fa fa-sync-alt"></i></a>
                            </div>
                        </div>                   
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

