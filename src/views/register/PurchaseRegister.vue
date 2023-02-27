<script lang="ts">
	export default {
		data(){
			return{
				isNewInvoice: true,
        products: [],
        discount: '',
        paymentTotal: '',
        acceptTotal: 0,
        refundTotal: '',
        printAfterSale: '',
        isPrintInvoice: true,
        isDownloadPdf: false,                
        completeButton: '<i class="fas fa-check"></i> Complete',
        completeBtnDisable: false,
        invoiceNo: '',
			}
		}
	}
</script>

<template>
	<div>
    <!-- row -->
    <div class="row">
        <div class="col">
            <div class="card bg-secondary text-white">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5>
                        <i class="fas fa-shopping-cart"></i> Purchase Register
                    </h5>
                </div>
            </div>
        </div>
    </div>
    <!-- row -->
    <div class="row mt-1">
        <div class="col-8">
            <div class="card bg-light">
                <div class="card-body pad-6">
                    <div class="row mb-1">
                        <div class="col-4">
                            <div class="input-group input-group-sm">
                                <span class="input-group-text">INV-</span>
                                <input type="text" class="form-control" placeholder="Invoice Number">
                            </div>
                        </div>
                        <div class="col-3 g-0">
                            <button href="javascript:void(0)" class="btn btn-success btn-sm btn-flat me-1">
                                <i class="fas fa-search"></i> Search </button>
                            <a href="http://127.0.0.1:8000/sales/add" class="btn btn-warning text-white btn-sm btn-flat">
                                <i class="fa fa-sync-alt"></i> Refresh </a>
                        </div>
                    </div>
                    <div class="row g-1">
                        <div class="col-2">
                            <input type="text" id="productCode" placeholder="Product Code" class="form-control form-control-sm">
                        </div>
                        <div class="col-5">
                            <input type="text" id="productName" data-id="" placeholder="Product Name" autocomplete="off" class="form-control form-control-sm">
                        </div>
                        <div class="col-2">
                            <select id="variant" class="form-select form-select-sm">
                                <option value="">-- Variant --</option>
                            </select>
                        </div>
                        <div class="col">
                            <a href="javascript:void(0)" class="btn btn-primary btn-sm">
                                <i class="fas fa-plus-circle"></i> Add </a>
                            <a href="javascript:void(0)" class="btn btn-danger btn-sm ms-1">
                                <i class="fa fa-sync-alt"></i> Clear </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card" style="margin-top: 0.5rem;">
                <div class="card-body pad-6">
                    <table class="table table-sm table-striped table-bordered">
                        <thead class="text-center">
                            <tr>
                                <th>SN</th>
                                <th width="55%">Product Name</th>
                                <th width="12%">Type</th>
                                <th width="10%">Quantity</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
		<div class="col-4">
            <div class="card bg-light">
                <div class="card-body pad-6">
                    <div class="row g-1">
                        <div class="col-8">
                            <input type="hidden">
                            <input type="text" class="form-control form-control-sm" placeholder="Search Customer">
                        </div>
                        <div class="col-4">
                            <a id="searchCustomerButton" href="javascript:void(0)" class="btn btn-primary btn-block btn-sm"><i class="fas fa-search"></i> Search </a>
                        </div>
                    </div>
                    <h6 class="text-center mt-1"><strong>OR</strong></h6>
                    <div class="d-flex align-items-center">
                        <a id="addCustomerButton" href="javascript:void(0)" class="btn btn-info btn-sm text-white" style="width: 50%;margin-right: 10px"><i class="fas fa-plus"></i> Add Supplier</a>
                        <a id="removeCustomerButton" href="javascript:void(0)" class="btn btn-danger btn-sm" style="width: 50%"><i class="far fa-times-circle"></i> Remove</a>
                    </div>
                    <div class="customer-info d-none">
                        <p><strong>Name: </strong><span></span></p>
                        <p><strong>Mobile: </strong><span></span></p>
                        <p><strong>Address: </strong><span></span></p>
                    </div>       
                </div>
            </div>
            <div class="card bg-light" style="margin-top:0.5rem">              
                <table class="table-sm">
                    <thead>
                        <tr class="bg-secondary bg-gradient text-white">
                            <th class="text-end" width="60%"><h6 ><strong>Sub Total </strong></h6></th>
                            <th class="text-end" width="35%">
                                <input type="text" class="form-control form-control-sm sub-total text-end" readonly>
                            </th> 
                            <th><h5>/=</h5></th>                           
                        </tr>
                        <tr>
                            <th class="text-end"><h6><strong>Discount</strong></h6></th>
                            <th ><input type="text" class="form-control form-control-sm discount text-end" v-model="discount" @keyup="calculateRefundTotal"></th>
                            <th><h5>%</h5></th>                            
                        </tr>
                        <tr class="bg-success bg-gradient text-white">
                            <th class="text-end"><h6><strong>Total</strong></h6></th>
                            <th><input type="text" class="form-control form-control-sm total text-end" v-model="total" readonly></th>
                            <th><h5>/=</h5></th>                            
                        </tr>                        
                    </thead>
                </table>
            </div>
            <div class="card bg-light" style="margin-top:0.5rem">              
                <table class="table-sm">
                    <thead>
                        <tr class="bg-primary bg-gradient text-white">
                            <th class="text-end" width="60%"><h6><strong>Paid</strong></h6></th>
                            <th width="35%"><input type="text" class="form-control form-control-sm payment-total text-end" v-model="paymentTotal" @keyup="calculateRefundTotal"></th>
                            <th><h5>/=</h5></th>                            
                        </tr>
                        <tr class="bg-danger bg-gradient text-white">
                            <th class="text-end"><h6><strong>Due</strong></h6></th>
                            <th><input type="text" class="form-control form-control-sm amount-due text-end" readonly></th>
                            <th><h5>/=</h5></th>                            
                        </tr>                 
                    </thead>
                </table>
            </div>

            <div class="card" style="margin-top:0.5rem">              
                <table class="table-sm">
                    <thead>
                        <tr class="bg-warning bg-gradient text-white">
                            <th class="text-end" width="60%"><h6><strong>Accept</strong></h6></th>
                            <th width="35%"><input type="text" class="form-control form-control-sm accept-total text-end" v-model="acceptTotal" @keyup="calculateRefundTotal"></th>
                            <th><h5>/=</h5></th>                            
                        </tr>
                            <tr class="bg-info bg-gradient text-white">
                            <th class="text-end"><h6><strong>Refund</strong></h6></th>
                            <th><input type="text" class="form-control form-control-sm refund-total text-end" v-model="refundTotal" readonly></th>
                            <th><h5>/=</h5></th>                            
                        </tr>                 
                    </thead>
                </table>
            </div>

            <div v-if="isNewInvoice">
                <div class="card" style="margin-top:0.5rem;"> 
                    <div class="card-body" style="margin-left:0.5rem;">
                        <div class="row">
                            <div class="col-md-6">
                                <input type="checkbox" v-model="isPrintInvoice"  style="transform: scale(1.8);">&nbsp;&nbsp;<strong>Print Invoice </strong>
                            </div>  
                            <div class="col-md-6">
                                <input type="checkbox" v-model="isDownloadPdf"  style="transform: scale(1.8);">&nbsp;&nbsp;<strong>Download PDF </strong>
                            </div>  
                        </div> 
                    </div>     
                </div>
            </div>             
            <div class="col d-grid" style="margin-top:0.5rem;"> 
                <button class="btn btn-success btn-flat" :disabled="completeBtnDisable"  v-html="completeButton"></button>  
            </div>   
        </div>		
    </div>
</div>
</template>