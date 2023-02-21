<script lang="ts">
import Typeahead from 'vue3-simple-typeahead'
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css' //Optional default CSS
export default {
  components: { Typeahead },
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
                    <form action="" autocomplete="off">                        
                        <div class="row"> 
                             <div class="col-2">
                                <label class="form-label">Variant Type <span class="required">(*)</span></label>
                                <select id="variant_type" class="form-select" name="variant_type">
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
                                <!-- <input type="text" class="form-control" placeholder="Type Anything" id="product_name">-->
                                <typeahead 
                                  class="form-control"
                                  id="typeahead_id"
                                  placeholder="Type Anything..."
                                  :items="['One','Two','Three']"
                                  :minInputLength="1"                                
                                ></typeahead>
                            </div>
                            <div class="col" style="margin-top: 31px">
                                <button type="submit" class="btn btn-primary"><i class="fas fa-search"></i> Search </button> &nbsp;
                                <button class="btn btn-warning text-white ml-2" :to="{name: 'stock.view'}"><i class="fa fa-sync-alt"></i> Refresh </button>
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
                        <td>1</td>
                        <td>Product 1</td>
                        <td><input type="hidden" name="variant_id[]" value="">5w</td>
                        <td><input type="text" class="form-control form-control-sm" dir="rtl" name="dp_price[]" autofocus ></td>
                        <td><input type="text" class="form-control form-control-sm" dir="rtl" name="tp_price[]"></td>
                        <td><input type="text" class="form-control form-control-sm" dir="rtl" name="price[]"></td>
                        <td><input type="text" class="form-control form-control-sm" dir="rtl" name="quantity[]"></td>                                    
                    </tr>
                  </tbody>
              </table>
              <div class="d-grid">
                <button type="submit" class="btn btn-success btn-block btn-flat"><i class="fas fa-hdd"></i> Store Stock</button>
              </div>
           </div>
        </div>
      </div>
    </div>
    <!-- row -->

    <!-- row -->
    <div class="row mt-2">
      <div class="col">
        
       
      </div>
    </div>   
    <!-- row -->
  </div>
</template>