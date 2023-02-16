<script lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as Yup from 'yup'
import DataTable from '../../components/global/DataTable.vue'
export default {
    setup(){
        const schema = Yup.object().shape({
            category_name: Yup.string()
                .required('Category name is required')
        })
        return { schema }
    },
    components: {DataTable, Form, Field, ErrorMessage},
    data(){
        return {
            headers: [
                { text: "Category Name", value: "category_name"},
                { text: "Description", value: "category_description"},
                { text: "Action", value: "operation", width: 100 }
            ]
        }
    },
    mounted(){
        // this.toast.success('<strong> Login successfully. <i class="fas fa-smile"></i> </strong>')
    },
    methods: {
        // validateName(value:String){
        //     if (!value || value.length < 1) {
        //         return 'This field is required';
        //     }
        //     return true
        // },
        onSubmit(values:Object){
            console.log(JSON.stringify(values));
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
                    <Form autocomplete="off" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">                        
                        <div class="row"> 
                            <div class="col-3">
                                <label class="form-label">Category Name <span class="required">(*)</span></label>
                                <Field type="text" class="form-control" :class="{'is-invalid' : errors.category_name}" placeholder="Category Name" name="category_name" />
                                    <div class="invalid-feedback">
                                        {{ errors.category_name }}
                                    </div> 
                            </div>                           
                            <div class="col-5 g-0">
                                <label class="form-label">Category Description </label>
                                <Field type="text" class="form-control" placeholder="Category Description" name="category_description" />                                
                            </div>
                            <div class="col-2" style="margin-top: 31px">
                                <button type="submit" class="btn btn-primary btn-radius"><i class="fas fa-hdd"></i> Store Category </button> &nbsp;
                            </div>
                        </div>                    
                    </Form>
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
              <DataTable :url="'/category'" :headers="headers" :sort="true" />
            </div>
          </div>
        </div>
      </div>
      <!-- row -->

  </div>
</template>