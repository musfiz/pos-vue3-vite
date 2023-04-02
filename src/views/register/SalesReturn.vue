<script lang="ts">
import Typeahead from 'vue3-simple-typeahead'
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css' //Optional default CSS
export default {
    components: { Typeahead },
    data(){
        return{
            invoiceNo: '',
            products: [],
            variants: [],
            previousSales:{
                list: []
            },
            updatedSales: {
                list: []
            },
            productId: '',
            productVariantId: '',
            productName: '',

            customer: {},

            acceptTotal: 0,
            refundTotal: 0,     
        }
    },
    computed:{
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
        getReceiptByInvoiceNo(){
            if(this.invoiceNo){
                this.cashReceipt = {}
                const params = 'INV-'+this.invoiceNo
                this.axios.get('common/sales/'+ params)
                    .then(({data}) => {
                        const payload = data.data
                        if(payload){
                            this.prepareDataBeforePrint(payload)
                            //Sales Details
                            let salesList = []
                            payload.sales_details.forEach((obj) => {
                                const list = {
                                    'stockId': obj.stock.id,
                                    'productName': obj.stock.product_variant.product.product_name,
                                    'variantName': obj.stock.product_variant.variant.variant_name,
                                    'price': Math.ceil(obj.stock.price),
                                    'quantity': obj.quantity,
                                    'total': Math.ceil(obj.stock.price * obj.quantity)    
                                }
                                this.previousSales.list.push(list)
                                this.updatedSales.list.push(list)                         
                            })
                            this.previousSales.invoice = payload.invoice_no
                            this.previousSales.date = payload.created_at
                            this.updatedSales.invoice = payload.invoice_no
                            this.updatedSales.date = payload.created_at
                            //Customer
                            this.customer.name = payload.customer.name
                            this.customer.mobileNo = payload.customer.mobile_no
                            this.customer.address = payload.customer.address
                            //Amount
                            const amount = {
                                'discount': Math.ceil(payload.discount),
                                'grandTotal': Math.ceil(payload.total),
                                'paymentTotal': Math.ceil(payload.payment_total),
                                'paymentDue': Math.ceil(payload.due),
                                
                            }
                            Object.assign(this.previousSales, amount)
                            Object.assign(this.updatedSales, amount)
                        }else{
                            this.toast.error('Invoice not found!') 
                        }                        
                    })
                    .catch(({response}) => {})
            }else{
                this.toast.error('Please enter invoice number!') 
            }
        },
        prepareDataBeforePrint(data){
            let products = []
            data.sales_details.forEach((obj) => {
                const list = {
                    'stockId': obj.stock.id,
                    'productName': obj.stock.product_variant.product.product_name,
                    'variantName': obj.stock.product_variant.variant.variant_name,
                    'price': Math.ceil(obj.stock.price),
                    'quantity': obj.quantity,
                    'total': Math.ceil(obj.stock.price * obj.quantity)
                }
                products.push(list)
            })
            Object.assign(this.cashReceipt, {products: products})
            this.cashReceipt.invoiceNo = data.invoice_no
            this.cashReceipt.subtotal = Math.ceil(data.subtotal)
            this.cashReceipt.discount = Math.ceil(data.discount)
            this.cashReceipt.total = Math.ceil(data.total)
            this.cashReceipt.paymentTotal = Math.ceil(data.payment_total)
            this.cashReceipt.due = Math.ceil(data.due)
            this.cashReceipt.createdAt = data.created_at
            this.cashReceipt.customerName = data.customer.name,
            this.cashReceipt.mobileNo = data.customer.mobile_no,
            this.cashReceipt.address = data.customer.address ? data.customer.address : 'N/A'

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
                        <h5><i class="fas fa-shopping-cart"></i> Sales Return</h5>
                    </div>
                </div>
            </div>
        </div>
        <!-- row -->
        <div class="row g-1 mt-1">
            <div class="col-4">
                <div class="card bg-light">
                    <div class="card-body pad-6">
                        <div class="row">
                            <div class="col-7">
                                <div class="input-group input-group-sm">
                                    <span class="input-group-text">INV-</span>
                                    <input type="text" class="form-control" placeholder="Invoice Number" v-model="invoiceNo">
                                </div>
                            </div>
                            <div class="col g-0">
                                <button class="btn btn-success btn-sm btn-flat me-1" @click="getReceiptByInvoiceNo">
                                    <i class="fas fa-search"></i> Search </button>
                                <a class="btn btn-outline-warning btn-sm btn-flat" @click="onRefresh">
                                    <i class="fa fa-sync-alt"></i> Refresh </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-8">
                <div class="card bg-light">
                    <div class="card-body pad-6">
                        <div class="row g-1">
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
                                <button class="btn btn-primary btn-flat btn-sm" @click="addProductToInvoice" tabindex="0">
                                    <i class="fas fa-plus-circle"></i> Add Product</button>
                                <button class="btn btn-outline-danger btn-sm btn-flat ms-1" tabindex="-1" @click="onClear">
                                    <i class="fa fa-sync-alt"></i> Clear </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- row -->
        <div class="row mt-1 g-1">
            <div class="col-6">
                <div class="card border-success">
                    <div class="card-header border-success">
                        <strong>Previous Sales</strong>
                    </div>
                    <div class="card-body">
                        <table class="table table-sm table-striped table-bordered my-1">
                            <thead>
                                <tr>
                                    <th>Invoice: {{ previousSales.invoice }}</th>
                                    <th>Date: </th>
                                </tr>                               
                            </thead>
                        </table>
                        <table class="table table-sm table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th width="45%">Customer: {{ customer.name }}</th>
                                    <th>Mobile: {{ customer.mobileNo }}</th>
                                </tr>                                
                            </thead>
                            <thead>
                                <tr>
                                    <th colspan="2">Address: {{ customer.address }}</th>
                                </tr>                                
                            </thead>
                        </table>
                        <table class="table table-sm table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th width="50%">Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody> 
                                <tr v-for="(item, index) in previousSales.list" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.productName }} {{ item.variantName }}</td>
                                    <td>{{ item.quantity }}</td>
                                    <td>{{ item.price }}</td>
                                    <td>{{ item.total }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="table table-sm table-bordered">
                            <tbody>
                                <tr>
                                    <td colspan="2" width="58%"></td>
                                    <th class="text-left" width="30%">SubTotal</th>
                                    <td class="text-right">800</td>
                                </tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <th class="text-left">Discount(%)</th>
                                    <td class="text-right"></td>
                                </tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <th class="text-left">Total</th>
                                    <td class="text-right"></td>
                                </tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <th class="text-left">Paid</th>
                                    <td class="text-right"></td>
                                </tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <th class="text-left">Due</th>
                                    <td class="text-right"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="card">
                    <div class="card border-danger">
                        <div class="card-header border-danger">
                            <strong>Updates Sales</strong>
                        </div>
                        <div class="card-body">
                        <!-- <p><strong>Invoice: </strong></p>
                        <p><strong>Customer Name: </strong></p>
                        <p><strong>Mobile: </strong></p>
                        <p><strong>Address: </strong></p>
                        <p><strong>Sold By: </strong></p> -->
                        <table class="table table-sm table-striped table-bordered my-1">
                            <thead>
                                <th width="45%">Invoice: </th>
                                <th>Update Date: </th>
                            </thead>
                        </table>
                        <table class="table table-sm table-striped table-bordered">
                            <thead>
                                <th width="45%">Customer: </th>
                                <th>Mobile: </th>
                            </thead>
                            <thead>
                                <th colspan="2">Address</th>
                            </thead>
                        </table>
                        <table class="table table-sm table-striped table-bordered">
                            <thead>
                                <th>SN</th>
                                <th width="50%">Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Action</th>
                            </thead>
                        </table>
                        <table class="table table-sm table-bordered">
                            <tbody>
                                <tr>
                                    <td colspan="2" width="58%"></td>
                                    <th class="text-left" width="30%">SubTotal</th>
                                    <td class="text-right"></td>
                                </tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <th class="text-left">Discount(%)</th>
                                    <td class="text-right"></td>
                                </tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <th class="text-left">Total</th>
                                    <td class="text-right"></td>
                                </tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <th class="text-left">Paid</th>
                                    <td class="text-right"></td>
                                </tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <th class="text-left">Due</th>
                                    <td class="text-right"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col">
                <div class="card">
                    <div class="card-body pad-6">
                        <div class="row">
                            <div class="col-12 d-grid">
                                <button class="btn btn-success btn-flat"><i class="fas fa-hdd"></i> Return/Updates</button>                        
                            </div>
                        </div>                   
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>