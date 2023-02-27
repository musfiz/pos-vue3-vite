
<script lang="ts">
import DataTable from '../../components/global/DataTable.vue'
export default {
    components: {DataTable},
    data(){
        return {
            headers: [
                { text: "Name", value: "name"},
                { text: "Mobile No.", value: "mobile_no"},
                { text: "Email", value: "email"},
                { text: "Address", value: "address"},
                { text: "Action", value: "operation", width: 100 }
            ], 
            id: '',         
            name: '',
            mobileNo: '',
            email: '' ,
            address:'',
            nameError: '',
            mobileNoError: '',
            submitBtn: 'Store'         
        }
    },
    methods: {
        onSubmit(e){
            e.preventDefault()
            
            if(this.id){
                let params:Object = {
                    '_method': 'PUT',
                    'id': this.id,
                    'name': this.name,
                    'mobile_no': this.mobileNo,
                    'email': this.email,
                    'address': this.address,
                }
                this.axios.put('customer/'+ this.id, params)
                    .then(({data}) => {
                        this.toast.info(data.message)
                        this.onRefresh()
                        this.$refs.dataTable.reload()
                    })
                    .catch(({response}) => {
                        this.nameError = response.data.errors.name ? response.data.errors.name[0]: ''
                        this.mobileNoError = response.data.errors.mobile_no ? response.data.errors.mobile_no[0]: ''
                    })
            }else{
                let params:Object = {
                    'name': this.name,
                    'mobile_no': this.mobileNo,
                    'email': this.email,
                    'address': this.address,
                }
                this.axios.post('customer', params)
                    .then(({data}) => {
                        this.toast.success(data.message)
                        this.onRefresh()
                        this.$refs.dataTable.reload()
                    })
                    .catch(({response}) => {
                        this.nameError = response.data.errors.name ? response.data.errors.name[0]: ''
                        this.mobileNoError = response.data.errors.mobile_no ? response.data.errors.mobile_no[0]: ''
                    })
            }
        },

        onEdit(item:Object){
            this.submitBtn = 'Update'
            this.id = item.id
            this.name = item.name
            this.mobileNo = item.mobile_no
            this.email = item.email
            this.address = item.address
        },

        onDelete(item:Object){
            this.axios.delete('customer/'+ item.id, {'_method': 'DELETE'})
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
            this.name = ''
            this.mobileNo = ''
            this.email = ''
            this.address = ''
            this.nameError = ''
            this.mobileNoError = ''
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
                    <h5><i class="fa fa-list"></i> Customer</h5>
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
                             <div class="col-4">
                                <label class="form-label">Customer Name <span class="required">(*)</span></label>
                               <input type="text" class="form-control" :class="{'is-invalid': nameError}" placeholder="Customer Name" v-model="name">
                               <div class="invalid-feedback">{{ nameError }}</div>  
                            </div>                           
                            <div class="col-4 g-0">
                                <label class="form-label">Mobile Number <span class="required">(*)</span></label>
                                <input type="text" class="form-control" :class="{'is-invalid': mobileNoError}" placeholder="Mobile Number" v-model="mobileNo">   
                                <div class="invalid-feedback">{{ mobileNoError }}</div>                               
                            </div>
                            <div class="col-4">
                                <label class="form-label">Email</label>
                                <input type="text" class="form-control" placeholder="Email" v-model="email">                                
                            </div>
                            <div class="col-12">
                              <label class="form-label">Address</label>
                              <textarea class="form-control" rows="2" v-model="address" placeholder="Address"></textarea>
                            </div>
                            <div class="col-2 mt-2 d-grid">
                                <button type="submit" class="btn btn-primary btn-flat"><i class="fas fa-hdd"></i> {{ submitBtn }} Customer </button>
                            </div>
                            <div class="col-1 mt-2 g-0">
                                <a class="btn btn-success btn-flat" title="Refresh" @click="onRefresh"><i class="fas fa-refresh"></i></a>
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
                <DataTable :url="'/customer'" :headers="headers" :sort="true" ref="dataTable" @onEdit="onEdit" @onDelete="onDelete"/>
            </div>
          </div>
        </div>
      </div>
      <!-- row -->

  </div>
</template>