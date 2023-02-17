<script lang="ts">
// import * as Yup from 'yup'
import DataTable from '../../components/global/DataTable.vue'
export default {
    // setup(){
    //     const schema = Yup.object().shape({
    //         category_name: Yup.string()
    //             .required('The category name field is required.')
    //     })
    //     return { schema } //you can use this schema on template option
    // },
    components: {DataTable},
    data(){
        return {
            headers: [
                { text: "Category Name", value: "category_name"},
                { text: "Description", value: "category_description"},
                { text: "Action", value: "operation", width: 100 }
            ],
          
            categoryName: '',
            categoryDescription: '',
            categoryNameError: ''            
        }
    },
    mounted(){
        // this.toast.success('<strong> Login successfully. <i class="fas fa-smile"></i> </strong>')
    },
    methods: {
        onSubmit(e){
            e.preventDefault()
            const params:object = {
                'category_name': this.categoryName,
                'category_description': this.categoryDescription
            }
            this.axios.post('category', params)
            .then(({data}) => {
                this.toast.success(data.message)
                this.$refs.dataTable.reload()
            })
            .catch(({response}) => {
                // console.log(response.data.errors.category_name[0])
                this.categoryNameError = response.data.errors.category_name[0]
            })
        },

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
                    <h5><i class="fa fa-list"></i> Product Category</h5>
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
                                <input type="text" class="form-control" :class="{'is-invalid': categoryNameError}" placeholder="Category Name" v-model="categoryName">
                                <div class="invalid-feedback">
                                    {{ categoryNameError }}
                                </div> 
                            </div>                           
                            <div class="col-5 g-0">
                                <label class="form-label">Category Description </label>
                                <input type="text" class="form-control" placeholder="Category Description" v-model="categoryDescription">
                            </div>
                            <div class="col-2" style="margin-top: 31px">
                                <button type="submit" class="btn btn-primary btn-radius"><i class="fas fa-hdd"></i> Store Category </button> &nbsp;
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
              <DataTable :url="'/category'" :headers="headers" :sort="true" ref="dataTable"/>
            </div>
          </div>
        </div>
      </div>
      <!-- row -->
  </div>
</template>