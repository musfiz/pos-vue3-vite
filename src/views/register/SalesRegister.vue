<script lang="ts">
import Typeahead from 'vue3-simple-typeahead'
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css' //Optional default CSS
export default {
    components: { Typeahead },
    data(){
        return{
            isNewInvoice: true,
            isPrintInvoice: true,
            isDownloadPdf: false,      
            invoiceNo: '',
            products: [],
            variants: [],
            
            salesList: [], //Sales product list
            productId: '',
            productVariantId: '',
            productName: '',
            //
            discount: 0,
            grandTotal: 0,
            paymentTotal: 0,
            paymentDue: 0,
            acceptTotal: 0,
            refundTotal: 0,
            printAfterSale: '',                     
            completeButton: '<i class="fas fa-check"></i> Complete',
            completeBtnDisable: false,

            //Custmer Module Part
            customer: [],
            isCustomer: false,
            selectedCustomer: {},
            newCustomer: {},           
            customerNameError: '',
            customerMobileError: ''
            
        }
    },
    computed: {
        subtotal(){
            return Math.ceil(this.salesList.reduce((item, key) => item + key.total, 0))
        },
    },
    methods:{
        projectedItem(item){
            return item.name +' ('+ item.code +')'
        },

        onSelectedItem(item){
            this.productId = item.id
            this.productName = item.name
            if(this.productId){
                this.loadVariant(this.productId)
            }
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

        loadVariant(productId){
            this.axios.get('common/product/variant', { params:{product_id: productId}})
                .then(({data}) => {
                    const variants = data.data
                    variants.forEach((item) => {
                        const obj = {
                            'product_variant_id': item.id,
                            'variant_name': item.variant.variant_name
                        }
                        this.variants.push(obj)
                    })
                })
                .catch(({response}) => {
                    console.log(response);                
                })
        },

        addProductToInvoice(){
            if (!this.productId){
                this.toast.error('Product not found !')
            } else if (!this.productVariantId){
                this.toast.error('Please select a product variant !')
            } else {
                this.axios.get('stock/product/variant/'+ this.productVariantId)
                .then(({data}) => {
                    const payload = data.data
                    const check = this.salesList.find(obj => obj.stockId == payload.id)
                    if(check){
                        this.toast.info('Product already added to sales list.')
                    }else{
                        let list = {
                            'stockId': payload.id,
                            'productName': payload.product_variant.product.product_name,
                            'variantName': payload.product_variant.variant.variant_name,
                            'price': Math.ceil(payload.price),
                            'quantity': 1,  
                            'total': Math.ceil(payload.price)                          
                        }
                        this.salesList.push(list)
                        this.grandTotal = this.subtotal
                        this.paymentDue = this.subtotal
                        this.onClear()
                    }
                })
                .catch(({response}) => {
                    console.log(response);                
                })
            }
        },

        changeQuantity(stockId, qty){
            const findItem = this.salesList.find(obj => obj.stockId == stockId)
            const index = this.salesList.findIndex(obj => obj.stockId == stockId)
            const price = findItem.price
            const total = price * qty
            this.salesList[index].total = total
            this.grandTotal = this.salesList.reduce((item, key) => item + key.total, 0)
            this.paymentDue = this.grandTotal
        },

        removeItem(){
            
        },

        //Customer All Funcitonality
        projectedCustomer(item){
            return item.name +' ('+ item.mobile_no +')'
        },

        onSelectedCustomer(item){            
            this.selectedCustomer.customerId = item.id
            this.selectedCustomer.name = item.name
            this.selectedCustomer.mobileNo = item.mobile_no
            this.selectedCustomer.address = item.address ? item.address : 'N/A'
        },

        onCustomerInput(item){
            this.clearCustomer()
            const params = {
                'query': item.input
            }
            this.axios.get('common/customer/search', { params })
                .then(({data}) => {
                    this.customer = data.data
                })
                .catch(({response}) => {
                    console.log(response);                
                })
        },

        addCustomer(){
            this.isCustomer = true
            this.$refs.inputCustomerRef.clearInput()   
        },

        storeCustomer(){
            this.axios.post('customer',  this.newCustomer)
                .then(({data}) => {                 
                    const item = data.data
                    this.clearCustomer()
                    this.isCustomer = true
                    this.selectedCustomer.customerId = item.id
                    this.selectedCustomer.name = item.name
                    this.selectedCustomer.mobileNo = item.mobile_no
                    this.selectedCustomer.address = item.address ? item.address : 'N/A'
                    this.$refs.closeModal.click();
                })
                .catch(({response}) => {                      
                    this.customerNameError = response.data.errors.name ? response.data.errors.name[0] : ''         
                    this.customerMobileError = response.data.errors.mobile_no ? response.data.errors.mobile_no[0] : ''         
                })
        },

        clearCustomer(){
            this.isCustomer = false
            this.selectedCustomer = {}
            this.customer = []
            this.newCustomer = {}
        },
        //Customer All Funcitonality        

        calculateTotalAfterDiscount(){
            if(this.discount > 0){
                const percent = ( this.subtotal / 100 ) * this.discount
                this.grandTotal = Math.ceil(this.subtotal - percent)
            }else if(this.discount < 0){
                this.discount = 0
                this.grandTotal = this.subtotal
                this.toast.warning("Discount can't be negetive. ")
            }else {
                this.grandTotal = this.subtotal
            }
        },

        calculateDue(){
            if(this.paymentTotal <= this.grandTotal){
                this.paymentDue = this.grandTotal - this.paymentTotal
            }else{
                this.toast.warning("Due can't be negetive. ")
                this.paymentDue = 0
            }
        },

        calculateRefund(){        
            const refund = this.acceptTotal - this.paymentTotal
            this.refundTotal = 0
            if(refund > 0){
                this.refundTotal = refund
            }
        },

        storeSales(){
            if (this.salesList.length == 0){
                this.toast.error('Product not added to list!')
            } else if (!this.selectedCustomer.customerId){
                this.toast.error('Please enter customer details!')
            } else if(this.paymentTotal > this.grandTotal){
                this.toast.error('Invalid paid total!')
            }
            else{
                const params = {
                'stock': this.salesList,
                'customer_id': this.selectedCustomer.customerId,
                'subtotal': this.subtotal,
                'discount': this.discount,
                'total': this.grandTotal,
                'payment_total': parseFloat(this.paymentTotal),
                'payment_due': this.paymentDue
            }
            this.axios.post('sales',  params)
                .then(({data}) => {

                })
                .catch(({response}) => {       

                })
            }            
        },

        onClear(){
            this.productId = ''
            this.productName = ''
            this.productVariantId = ''
            this.products = []
            this.variants = []
            this.$refs.inputRef.clearInput()      
        },

        onRefresh(){

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
                    <h5><i class="fas fa-shopping-cart"></i> Sales Register</h5>
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
                        <div class="col-5 d-flex justify-content-end">                               
                            <router-link target="_blank" class="btn btn-secondary btn-sm btn-flat me-1" :to="{name: 'register.sales'}"><i class="fas fa-hand-back-fist"></i> Hold</router-link>
                        </div>
                    </div>
                    <div class="row g-1">
                        <!-- <div class="col-2">
                            <input type="text" id="productCode" placeholder="Product Code" class="form-control form-control-sm">
                        </div> -->
                        <div class="col-6">
                            <typeahead 
                                class="form-control form-control-sm"
                                ref="inputRef"
                                placeholder="Type product name or code ..."
                                :items="products"
                                :minInputLength="1" 
                                :itemProjection="projectedItem"
                                @selectItem="onSelectedItem"    
                                @onInput="onInput" 
                                autofocus   
                                tabindex="0"                                   
                            ></typeahead>
                        </div>
                        <div class="col-3">
                            <select id="variant" class="form-select form-select-sm" v-model="productVariantId" tabindex="0">
                                <option value="">-- Select Variant --</option>
                                <option v-for="item in variants" :key="item.id" :value="item.product_variant_id" >{{ item.variant_name }}</option>
                            </select>
                        </div>
                        <div class="col">
                            <a href="javascript:void(0)" class="btn btn-primary btn-sm" @click="addProductToInvoice" tabindex="0">
                                <i class="fas fa-plus-circle"></i> Add Product</a>
                            <a href="javascript:void(0)" class="btn btn-danger btn-sm ms-1" tabindex="-1">
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
                                <th width="45%">Product Name</th>
                                <th width="12%">Type</th>
                                <th width="10%">Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th width="5%">Action</th>
                            </tr>
                        </thead>
                        <tbody style="font-size: 14px; font-weight: bold;">
                            <tr v-for="(item, index) in salesList" :key="item.stockId">
                                <td class="text-center">{{ index+1 }}</td>
                                <td>{{ item.productName }}</td>
                                <td class="text-center">{{ item.variantName }}</td>
                                <td>
                                    <input type="number" 
                                        class="text-end"
                                        v-model="item.quantity" 
                                        style="width:70px" 
                                        min="1"
                                        tabindex="-1"
                                        @input="changeQuantity(item.stockId, item.quantity) 
                                                                               
                                    ">
                                </td>
                                <td class="text-center">{{ item.price }}/-</td>
                                <td class="text-center">{{ item.total }}/-</td>
                                <td class="text-center">
                                    <button class="bg-danger text-white" style="border: none" @click="removeItem(item.stockId)" tabindex="-1"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
		<div class="col-4">
            <div class="card bg-light">
                <div class="card-body pad-6">
                    <div class="row g-1">
                        <div class="col-8">
                            <typeahead 
                                class="form-control form-control-sm"
                                ref="inputCustomerRef"
                                placeholder="Search by name or mobile..."
                                :items="customer"
                                :minInputLength="1" 
                                :itemProjection="projectedCustomer"
                                @selectItem="onSelectedCustomer"    
                                @onInput="onCustomerInput" 
                                autofocus   
                                tabindex="0"                                   
                            ></typeahead>
                        </div>
                        <div class="col-4">
                            <a id="searchCustomerButton" href="javascript:void(0)" class="btn btn-primary btn-block btn-sm" @click="addCustomer"><i class="fas fa-plus-circle"></i> Add Customer </a>
                        </div>
                    </div>
                    <h6 class="text-center mt-1"><strong>OR</strong></h6>
                    <div class="d-flex align-items-center">
                        <button  class="btn btn-success btn-sm text-white" style="width: 50%; margin-right: 10px" data-bs-target="#customerModal" data-bs-toggle="modal" @click="clearCustomer"><i class="fas fa-plus"></i> New Customer</button>
                        <a class="btn btn-danger btn-sm" style="width: 50%" @click="clearCustomer"><i class="far fa-times-circle"></i> Remove</a>
                    </div>
                    <div class="customer-info" v-if="isCustomer">
                        <p><strong>Name: </strong><span>{{ selectedCustomer.name }}</span></p>
                        <p><strong>Mobile: </strong><span>{{ selectedCustomer.mobileNo }}</span></p>
                        <p><strong>Address: </strong><span>{{ selectedCustomer.address }}</span></p>
                    </div>       
                </div>
            </div>

            <div class="card bg-light" style="margin-top:0.5rem">              
                <table class="table-sm">
                    <thead>
                        <tr class="bg-secondary bg-gradient text-white">
                            <th class="text-end" width="60%"><h6 ><strong>Sub Total </strong></h6></th>
                            <th class="text-end" width="35%">
                                <input type="text" 
                                    class="form-control form-control-sm sub-total text-end" 
                                    readonly 
                                    v-model="subtotal" 
                                    @focus="$event.target.select()"
                                >
                            </th> 
                            <th><h5>/=</h5></th>                           
                        </tr>
                        <tr>
                            <th class="text-end" width="60%"><h6><strong> Discount</strong></h6></th>
                            <th class="text-end" width="35%">
                                <input type="text" 
                                    class="form-control form-control-sm discount text-end" 
                                    v-model="discount" 
                                    @input="calculateTotalAfterDiscount" 
                                    @focus="$event.target.select()"
                                >
                            </th>
                            <th><h5>%</h5></th>                            
                        </tr>
                        <tr class="bg-success bg-gradient text-white">
                            <th class="text-end"><h6><strong>Total</strong></h6></th>
                            <th><input type="text" class="form-control form-control-sm total text-end" v-model="grandTotal" readonly></th>
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
                            <th width="35%">
                                <input type="text" 
                                    class="form-control form-control-sm payment-total text-end" 
                                    v-model="paymentTotal"
                                    @focus="$event.target.select()" 
                                    @keyup="calculateDue"
                                >
                            </th>
                            <th><h5>/=</h5></th>                            
                        </tr>
                        <tr class="bg-danger bg-gradient text-white">
                            <th class="text-end"><h6><strong>Due</strong></h6></th>
                            <th><input type="text" class="form-control form-control-sm amount-due text-end" readonly tabindex="-1" v-model="paymentDue"></th>
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
                            <th width="35%">
                                <input type="text" 
                                    class="form-control form-control-sm accept-total text-end" 
                                    accesskey="s"
                                    v-model="acceptTotal" 
                                    @focus="$event.target.select()" 
                                    @keyup="calculateRefund"
                                    >
                                </th>
                            <th><h5>/=</h5></th>                            
                        </tr>
                            <tr class="bg-info bg-gradient text-white">
                            <th class="text-end"><h6><strong>Refund</strong></h6></th>
                            <th><input type="text" class="form-control form-control-sm refund-total text-end" v-model="refundTotal" readonly tabindex="-1"></th>
                            <th><h5>/=</h5></th>                            
                        </tr>                 
                    </thead>
                </table>
            </div>

            <div class="col d-grid" style="margin-top:0.5rem;"> 
                <button class="btn btn-success btn-flat" :disabled="completeBtnDisable"  v-html="completeButton" @click="storeSales"></button>  
            </div>  

            <div v-if="isNewInvoice">
                <div class="card" style="margin-top:0.5rem;"> 
                    <div class="card-body" style="margin-left:0.5rem;">
                        <div class="row">
                            <div class="col-md-6">
                                <input type="checkbox" v-model="isPrintInvoice"  style="transform: scale(1.2);">&nbsp;&nbsp;<strong>Print Invoice </strong>
                            </div>  
                            <div class="col-md-6">
                                <input type="checkbox" v-model="isDownloadPdf"  style="transform: scale(1.2);">&nbsp;&nbsp;<strong>Download PDF </strong>
                            </div>  
                        </div> 
                    </div>     
                </div>
            </div>

            
        </div>		
    </div>

    <!-- Modal -->
    <div id="customerModal" ref="customerModal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add Customer</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col">
                            <label class="form-label">Name <span class="required" title="requried">(*)</span></label>
                            <input type="text" class="form-control" :class="{'is-invalid': customerNameError }" v-model="newCustomer.name">
                            <span class="invalid-feedback">{{ customerNameError }}</span>
                        </div>
                        <div class="col">
                            <label class="form-label">Mobile Number <span class="required" title="requried">(*)</span></label>
                            <input type="text" class="form-control" :class="{'is-invalid': customerMobileError }" v-model="newCustomer.mobile_no">
                            <span class="invalid-feedback">{{ customerMobileError }}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label class="form-label">Address</label>
                            <textarea class="form-control" rows="3" style="resize:none" v-model="newCustomer.address"></textarea>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col d-grid">
                            <button class="btn btn-flat btn-primary" @click="storeCustomer"><i class="fas fa-hdd"></i> Create</button>
                        </div>
                        <div class="col d-grid">
                            <button ref="closeModal" class="btn btn-flat btn-secondary" data-bs-dismiss="modal"><i class="fas fa-close"></i> Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
</div>
</template>