<script lang="ts">
import Typeahead from 'vue3-simple-typeahead'
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css' //Optional default CSS
export default {
  components: { Typeahead },
  data(){
    return {
      productStock: [],
      productId: '',
      productName: '',
      variantType: '',
      variantTypeError: '',
      selectedProductError: '',
      products: [],
    }
  },
  methods: {
    projectedItem(item){
      return item.name +' ('+ item.code +')'
    },
    onSelectedItem(item){
      this.productId = item.id
      this.productName = item.name
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
      const params = {
        'variant_type': this.variantType,
        'product_id': this.productId,
        'product_name': this.productName
      }
      this.$router.replace({name: 'stock.add', query: params})
      this.onShowProductDetails()
    },
    onShowProductDetails(){

    },
    stockEntry(){

    },
    onRefresh(){
      this.$router.replace({name: 'stock.add'})
      this.variantType = ''
      this.productId = ''
      this.productName = ''
      this.products = []
      this.$refs.inputRef.clearInput()
      
    }
  },
  mounted(){
    if(this.$route.query.variant_type && this.$route.query.product_id){
      this.variantType = this.$route.query.variant_type
      this.productId = this.$route.query.product_id
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
                             <div class="col-2">
                                <label class="form-label">Variant Type <span class="required">(*)</span></label>
                                <select id="variant_type" class="form-select" v-model="variantType">
                                    <option value="">Select Type</option>
                                    <option value="Watt">Watt</option>
                                    <option value="Inch">Inch</option>
                                    <option value="Size">Size</option>                                    
                                    <option value="Meterail">Meterail</option>
                                    <option value="Gang">Gang</option>
                                    <option value="Color">Color</option>
                                    <option value="Pin">Pin</option>
                                    <option value="Weight">Weight</option>
                                    <option value="Height">Height</option>
                                    <option value="Piece">Piece</option>
                                    <option value="Core">Core</option>
                                    <option value="Hole">Hole</option>
                                </select>
                            </div>                           
                            <div class="col">
                                <label class="form-label">Type Product Name or Product Code <span class="required">(*)</span></label>
                                <typeahead 
                                  class="form-control"
                                  :class="{'is-invalid': selectedProductError}"
                                  ref="inputRef"
                                  placeholder="Type Anything..."
                                  :items="products"
                                  :minInputLength="1" 
                                  :itemProjection="projectedItem"
                                  @selectItem="onSelectedItem"    
                                  @onInput="onInput"                                       
                                ></typeahead>
                                <div class="custom-invalid-feedback">{{selectedProductError}}</div> 
                            </div>
                            <div class="col" style="margin-top: 31px">
                                <button type="submit" class="btn btn-primary"><i class="fas fa-search"></i> Search </button> &nbsp;
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
                    <tr>
                        <!-- <td>1</td>
                        <td>Product 1</td>
                        <td><input type="hidden" name="variant_id[]" value="">5w</td>
                        <td><input type="text" class="form-control form-control-sm" dir="rtl" name="dp_price[]" autofocus ></td>
                        <td><input type="text" class="form-control form-control-sm" dir="rtl" name="tp_price[]"></td>
                        <td><input type="text" class="form-control form-control-sm" dir="rtl" name="price[]"></td>
                        <td><input type="text" class="form-control form-control-sm" dir="rtl" name="quantity[]"></td>                                     -->
                    </tr>
                  </tbody>
              </table>
              <div class="d-grid" v-if="productStock.length > 0">
                <button type="submit" class="btn btn-success btn-block btn-flat"><i class="fas fa-hdd"></i> Store Stock</button>
              </div>
           </div>
        </div>
      </div>
    </div>
    <!-- row -->
  </div>
</template>