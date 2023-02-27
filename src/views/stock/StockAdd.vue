<script lang="ts">
import Typeahead from 'vue3-simple-typeahead'
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css' //Optional default CSS
export default {
  components: { Typeahead },
  data(){
    return {
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
    onSubmit(e){
      e.preventDefault()
      if(!this.productId){
        this.toast.error('<strong> Select a product for creating stock.</strong>')
      }else{
        const params = {
          'product_id': this.productId,
          'product_name': this.productName,
          'variant_ids': this.productVariantIds
        }
        this.$router.replace({name: 'stock.add', query: params})
        this.onGenerateForm()
      }
    },

    onGenerateForm(){
      this.axios.post('common/stock/check', this.productVariantIds)
        .then(({data}) => {
          if(data.data.length > 0){
            this.productVariant = data.data
          }else{
            this.toast.info('<strong>Stock already added for these product.</strong>')
            this.onRefresh()
          }
        })
        .catch(({response}) => {
          console.log(response);   
        })
    },
    
    createStock(e){
      e.preventDefault()
      let params = {
        'variant': this.productVariant
      }
      this.axios.post('stock', params)
        .then(({data}) => {
          this.toast.success(data.message)
          this.onRefresh()
        })
        .catch(({response}) => {
          console.log(response);   
        })
    },
    onRefresh(){
      this.$router.replace({name: 'stock.add'})
      this.productId = ''
      this.productName = ''
      this.products = []
      this.productVariant = []
      this.productVariantIds = []
      this.$refs.inputRef.clearInput()
      
    }
  },
  mounted(){
    if(this.$route.query.product_id){
      this.productId = this.$route.query.product_id
      this.productName = this.$route.query.product_name
      this.productVariantIds = this.$route.query.variant_ids
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
                  <h5><i class="fa fa-plus-circle"></i> Add Stock</h5>
                  <router-link :to="{name: 'stock.view'}" class="btn btn-primary btn-sm"><i class="fa fa-list"></i> View Stock</router-link>
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
                            <div class="col" style="margin-top: 31px">
                                <button type="submit" class="btn btn-primary"><i class="fas fa-list"></i> Generate Stock Form</button> &nbsp;
                                <a class="btn btn-warning text-white ml-2" @click="onRefresh"><i class="fa fa-sync-alt"></i></a>
                            </div>
                        </div>                    
                    </form>
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
              <table class="table table-sm table-bordered table-hover">
                  <thead class="align-middle">
                    <tr>
                      <th>SN</th>
                      <th width="50%">Product</th>
                      <th width="10%">Variant</th>
                      <th>DP (Price)</th>
                      <th>TP (Price)</th>
                      <th>MRP (Price)</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-show="productVariant.length > 0" v-for="(item, index) in productVariant" :key="item.id">
                        <td>{{ index+1 }}</td>
                        <td>{{ productName }}</td>
                        <td><input type="hidden">{{ item.variant_name }}</td>
                        <td><input type="text" class="form-control form-control-sm" dir="rtl" v-model="item.dpPrice" autofocus required></td>
                        <td><input type="text" class="form-control form-control-sm" dir="rtl" v-model="item.tpPrice"></td>
                        <td><input type="text" class="form-control form-control-sm" dir="rtl" v-model="item.price"></td>
                        <td><input type="text" class="form-control form-control-sm" dir="rtl" v-model="item.quantity"></td>                                    
                    </tr>
                  </tbody>
              </table>
              <div class="d-grid" v-if="productVariant.length > 0">
                <button type="submit" class="btn btn-success btn-block btn-flat" @click="createStock"><i class="fas fa-hdd"></i> Store Stock</button>
              </div>          
           </div>
        </div>
      </div>
    </div>
    <!-- row -->
  </div>
</template>