<script lang="ts">
import DataTable from '../../components/global/DataTable.vue'
export default {
    components: {DataTable},
    data(){
        return {
            headers: [
                { text: "Category", value: "category.category_name"},
                { text: "Subcategory", value: "subcategory.subcategory_name"},
                { text: "Vendor", value: "vendor.vendor_name"},
                { text: "Code", value: "code"},
                { text: "Class Code", value: "class_code"},
                { text: "Product Name", value: "product_name"},
                { text: "Action", value: "operation", width: 100 }
            ], 
            id: '',         
            categoryId: '',
            subcategoryId: '',
            vendorId: '',
            productName: '',
            categoryIdError: '' ,
            subcategoryIdError: '' ,
            vendorIdError: '' ,
            productNameError: '' ,
            submitBtn: 'Store'         
        }
    },
    methods: {
        onEdit(item:Object){
            this.id = item.id
            this.$router.push({name: 'product.edit', params: { id: this.id }})
        },

        onDelete(item:Object){
            this.axios.delete('product/'+ item.id, {'_method': 'DELETE'})
                .then(({data}) => {
                    this.$swal.fire(
                        'Deleted!',
                        data.message,
                        'success'
                    )
                    this.$refs.dataTable.reload()
                })
                .catch((error) => {
                    console.log(error);                    
                })
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
                  <div>
                    <h5><i class="fa fa-list"></i> Product</h5>
                  </div>
                  <div>
                    <router-link :to="{name: 'product.add'}" class="btn btn-success btn-sm me-2"><i class="fa fa-plus-circle"></i> Add Product</router-link>
                    <router-link to="/" class="btn btn-primary btn-sm text-white"><i class="fa fa-plus-circle"></i> Add Product By CSV</router-link>
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
                <DataTable :url="'/product'" :headers="headers" :sort="true" :rows="40" ref="dataTable" @onEdit="onEdit" @onDelete="onDelete"/>
            </div>
          </div>
        </div>
      </div>
      <!-- row --> 
  </div>
</template>