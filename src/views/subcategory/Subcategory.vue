<script lang="ts">
import DataTable from '../../components/global/DataTable.vue'
export default {
    components: {DataTable},
    data(){
        return {
            headers: [
                { text: "Category", value: "category_name"},
                { text: "Subcategory", value: "subcategory_name"},
                { text: "Description", value: "subcategory_description"},
                { text: "Action", value: "operation", width: 100 }
            ], 
            id: '', 
            categoryId: '',        
            subcategoryName: '',
            subcategoryDescription: '',
            categoryIdError: '' ,
            subcategoryNameError:'',
            submitBtn: 'Store',
            category: [],        
        }
    },
    methods: {
        onSubmit(e){
            e.preventDefault()
            
            if(this.id){
                let params:Object = {
                    '_method': 'PUT',
                    'category_id': this.categoryId,
                    'subcategory_name': this.subcategoryName,
                    'subcategory_description': this.subcategoryDescription
                }
                this.axios.put('subcategory/'+ this.id, params)
                    .then(({data}) => {
                        this.toast.info(data.message)
                        this.onRefresh()
                        this.$refs.dataTable.reload()
                    })
                    .catch(({response}) => {
                        this.categoryIdError = response.data.errors.category_id ? response.data.errors.category_id[0] : ''
                        this.subcategoryNameError = response.data.errors.subcategory_name ? response.data.errors.subcategory_name[0] :''
                    })
            }else{
                let params:Object = {
                    'category_id': this.categoryId,
                    'subcategory_name': this.subcategoryName,
                    'subcategory_description': this.subcategoryDescription
                }
                this.axios.post('subcategory', params)
                    .then(({data}) => {
                        this.toast.success(data.message)
                        this.onRefresh()
                        this.$refs.dataTable.reload()
                    })
                    .catch(({response}) => {
                        this.categoryIdError = response.data.errors.category_id ? response.data.errors.category_id[0] : ''
                        this.subcategoryNameError = response.data.errors.subcategory_name ? response.data.errors.subcategory_name[0] :''
                    })
            }
        },

        onEdit(item:Object){
            this.submitBtn = 'Update'
            this.id = item.id
            this.categoryId = item.category_id
            this.subcategoryName = item.subcategory_name
            this.subcategoryDescription = item.subcategory_description
        },

        onDelete(item:Object){
            this.axios.delete('subcategory/'+ item.id, {'_method': 'DELETE'})
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
        },

        onRefresh(){
            this.id = ''
            this.categoryId = ''
            this.subcategoryName = ''
            this.subcategoryDescription = ''
            this.submitBtn = 'Store'
            this.categoryIdError = ''
            this.subcategoryNameError = ''
            this.$refs.dataTable.reload()
        },

        getAllCategory(){
            this.axios.get('subcategory/category/list')
                .then(({data}) => {
                    this.category = data.data
                })
                .catch(({response}) => {
                    this.subcategoryNameError = response.data.errors.category_name[0]
                })
        }
    },
    mounted(){
        this.getAllCategory()
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
                    <form autocomplete="off" @submit="onSubmit">                        
                        <div class="row">
                            <div class="col-3">
                                <label class="form-label">Category Name <span class="required">(*)</span></label>
                                <select class="form-select" v-model="categoryId" :class="{'is-invalid': categoryIdError}">
                                    <option value="">Select Type</option>
                                    <option v-for="item in category" :key="item.id" :value="item.id">{{ item.category_name }}</option>
                                </select>
                                <div class="invalid-feedback">{{ categoryIdError }}</div> 
                            </div>    
                            <div class="col-3">
                                <label class="form-label">Subcategory Name <span class="required">(*)</span></label>
                               <input type="text" class="form-control" :class="{'is-invalid': subcategoryNameError}" placeholder="Subcategory Name" v-model="subcategoryName">
                               <div class="invalid-feedback">{{ subcategoryNameError }}</div> 
                            </div>                           
                            <div class="col-3 g-0">
                                <label class="form-label">Subcategory Description </label>
                                <input type="text" class="form-control" placeholder="Subcategory Description" v-model="subcategoryDescription">                                
                            </div>
                            <div class="col-3 d-flex" style="margin-top: 31px">
                                <button type="submit" class="btn btn-primary btn-radius"><i class="fas fa-hdd"></i> {{submitBtn}} Subcategory </button> &nbsp;
                                <a class="btn btn-success btn-radius" title="Refresh" @click="onRefresh"><i class="fas fa-refresh"></i></a> &nbsp;
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
                <DataTable :url="'/subcategory'" :headers="headers" :sort="true" ref="dataTable" @onEdit="onEdit" @onDelete="onDelete"/>
            </div>
          </div>
        </div>
      </div>
      <!-- row -->
  </div>
</template>