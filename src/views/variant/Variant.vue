<script lang="ts">
import DataTable from '../../components/global/DataTable.vue'
export default {
    components: {DataTable},
    data(){
        return {
            headers: [
                { text: "Variant Type", value: "variant_type"},
                { text: "Variant Name", value: "variant_name"},
                { text: "Action", value: "operation", width: 100 }
            ], 
            id: '',         
            variantType: '',
            variantName: '',
            varaintTypeError: '',
            variantNameError: '',
            submitBtn: 'Store'         
        }
    },
    methods: {
        onSubmit(e){
            e.preventDefault()            
            if(this.id){
                let params:Object = {
                    '_method': 'PUT',
                    'variant_name': this.variantName,
                    'variant_type': this.variantType
                }
                this.axios.put('variant/'+ this.id, params)
                    .then(({data}) => {
                        this.toast.info(data.message)
                        this.onRefresh()
                        this.$refs.dataTable.reload()
                    })
                    .catch(({response}) => {
                        this.varaintTypeError = response.data.errors.variant_type[0] ? response.data.errors.variant_type[0]: ''
                        this.variantNameError = response.data.errors.variant_name[0] ? response.data.errors.variant_name[0]: ''
                    })
            }else{
                let params:Object = {
                    'variant_name': this.variantName,
                    'variant_type': this.variantType
                }
                this.axios.post('variant', params)
                    .then(({data}) => {
                        this.toast.success(data.message)
                        this.onRefresh()
                        this.$refs.dataTable.reload()
                    })
                    .catch(({response}) => {
                        this.varaintTypeError = response.data.errors.variant_type[0] ? response.data.errors.variant_type[0]: ''
                        this.variantNameError = response.data.errors.variant_name[0] ? response.data.errors.variant_name[0]: ''
                    })
            }
        },

        onEdit(item:Object){
            this.submitBtn = 'Update'
            this.id = item.id
            this.variantType = item.variant_type
            this.variantName = item.variant_name
        },

        onDelete(item:Object){
            this.axios.delete('variant/'+ item.id, {'_method': 'DELETE'})
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
            this.variantType = ''
            this.variantName = ''
            this.varaintTypeError = ''
            this.variantNameError = ''
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
                    <h5><i class="fa fa-list"></i> Variant</h5>
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
                                <label class="form-label"> Variant Type <span class="required">(*)</span></label>
                                <select id="variant_type" class="form-select" :class="{'is-invalid': varaintTypeError}" v-model="variantType">
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
                                <div class="invalid-feedback">
                                    {{ varaintTypeError }}
                                </div> 
                            </div>    
                             <div class="col-5">
                                <label class="form-label">Variant Name <span class="required">(*)</span></label>
                               <input type="text" class="form-control" :class="{'is-invalid': variantNameError}"  placeholder="Variant Name" v-model="variantName">
                               <div class="invalid-feedback">
                                    {{ variantNameError }}
                                </div> 
                            </div>                           
                            <div class="col-3" style="margin-top: 31px">
                                <button type="submit" class="btn btn-primary btn-radius"><i class="fas fa-hdd"></i> {{ submitBtn }} Variant </button> &nbsp;
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
                <DataTable :url="'/variant'" :headers="headers" :sort="true" ref="dataTable" @onEdit="onEdit" @onDelete="onDelete"/>
            </div>
          </div>
        </div>
      </div>
      <!-- row -->

  </div>
</template>