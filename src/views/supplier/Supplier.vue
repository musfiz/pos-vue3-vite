<template>
  <div>
     <!-- row -->
     <div class="row">
        <div class="col">
            <div class="card border-secondary">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5><i class="fa fa-list"></i> Supplier</h5>
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
                             <div class="col-4">
                                <label class="form-label">Supplier Name <span class="required">(*)</span></label>
                               <input type="text" class="form-control" placeholder="Supplier Name">
                            </div>                           
                            <div class="col-4 g-0">
                                <label class="form-label">Mobile Number <span class="required">(*)</span></label>
                                <input type="text" class="form-control" placeholder="Mobile Number">                                
                            </div>
                            <div class="col-4">
                                <label class="form-label">Email</label>
                                <input type="text" class="form-control" placeholder="Email">                                
                            </div>
                            <div class="col-12">
                              <label class="form-label">Address</label>
                              <textarea class="form-control" rows="3"></textarea>
                            </div>
                            <div class="col-12 mt-2 d-grid">
                                <button type="submit" class="btn btn-success btn-radius"><i class="fas fa-hdd"></i> Store Supplier </button>
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