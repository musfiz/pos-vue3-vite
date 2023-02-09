<template>
  <div>
    <!-- row -->
    <div class="row">
        <div class="col">
            <div class="card border-secondary">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5><i class="fa fa-list"></i> Product Subcategory</h5>
                    <!-- <router-link :to="{name: 'stock.add'}" class="btn btn-success btn-sm"><i class="fa fa-plus-circle"></i> Add Stock</router-link> -->
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
                            <div class="col-3">
                                <label class="form-label">Category Name <span class="required">(*)</span></label>
                                <select class="form-select">
                                    <option value="">Select Type</option>
                                </select>
                            </div>    
                            <div class="col-3">
                                <label class="form-label">Subcategory Name <span class="required">(*)</span></label>
                               <input type="text" class="form-control" placeholder="Category Name">
                            </div>                           
                            <div class="col-4 g-0">
                                <label class="form-label">Subcategory Description </label>
                                <input type="text" class="form-control" placeholder="Category Description">                                
                            </div>
                            <div class="col-2" style="margin-top: 31px">
                                <button type="submit" class="btn btn-primary btn-radius"><i class="fas fa-hdd"></i> Store Subcategory </button> &nbsp;
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
              
            </div>
          </div>
        </div>
      </div>
      <!-- row -->

  </div>
</template>