<script lang="ts">
import DataTable from '../../components/global/DataTable.vue'
export default {
    components: {DataTable},
    data(){
        return {
            headers: [
                { text: "Vendor Name", value: "vendor_name"},
                { text: "Description", value: "vendor_description"},
                { text: "Action", value: "operation", width: 100 }
            ], 
            id: '',         
            vendorName: '',
            vendorDescription: '',
            vendorNameError: '' ,
            submitBtn: 'Store'         
        }
    },
    mounted(){
        // this.toast.success('<strong> Login successfully. <i class="fas fa-smile"></i> </strong>')
    },
    methods: {
        onSubmit(e){
            e.preventDefault()
            
            if(this.id){
                let params:Object = {
                    '_method': 'PUT',
                    'vendor_name': this.vendorName,
                    'vendor_description': this.vendorDescription
                }
                this.axios.put('vendor/'+ this.id, params)
                    .then(({data}) => {
                        this.toast.info(data.message)
                        this.onRefresh()
                        this.$refs.dataTable.reload()
                    })
                    .catch(({response}) => {
                        this.vendorNameError = response.data.errors.vendor_name[0]
                    })
            }else{
                let params:Object = {
                    'vendor_name': this.vendorName,
                    'vendor_description': this.vendorDescription
                }
                this.axios.post('vendor', params)
                    .then(({data}) => {
                        this.toast.success(data.message)
                        this.onRefresh()
                        this.$refs.dataTable.reload()
                    })
                    .catch(({response}) => {
                        // console.log(response.data.errors.vendor_name[0])
                        this.vendorNameError = response.data.errors.vendor_name[0]
                    })
            }
        },

        onEdit(item:Object){
            this.submitBtn = 'Update'
            this.id = item.id
            this.vendorName = item.vendor_name
            this.vendorDescription = item.vendor_description
        },

        onDelete(item:Object){
            this.axios.delete('vendor/'+ item.id, {'_method': 'DELETE'})
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
            this.vendorName = ''
            this.vendorDescription = ''
            this.vendorNameError = ''
            this.submitBtn = 'Store'
            this.$refs.dataTable.reload()
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
                    <h5><i class="fa fa-list"></i> Product Vendor</h5>
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
                                <label class="form-label">Vendor Name <span class="required">(*)</span></label>
                                <input type="text" class="form-control" :class="{'is-invalid': vendorNameError}" placeholder="Vendor Name" v-model="vendorName">
                                <div class="invalid-feedback">
                                    {{ vendorNameError }}
                                </div> 
                            </div>                           
                            <div class="col-5 g-0">
                                <label class="form-label">Vendor Description </label>
                                <input type="text" class="form-control" placeholder="Vendor Description" v-model="vendorDescription">                                
                            </div>
                            <div class="col-3" style="margin-top: 31px">
                                <button type="submit" class="btn btn-primary btn-radius"><i class="fas fa-hdd"></i> {{ submitBtn }} Vendor </button> &nbsp;
                                <a class="btn btn-success btn-radius" title="Refresh" @click="onRefresh"><i class="fas fa-refresh"></i></a> 
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
                <DataTable :url="'/vendor'" :headers="headers" :sort="true" ref="dataTable" @onEdit="onEdit" @onDelete="onDelete"/>
            </div>
          </div>
        </div>
      </div>
      <!-- row -->
  </div>
</template>