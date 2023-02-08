<template>
  <div>
      <easy-data-table 
          :headers="headers" 
          :items="items"
          v-model:server-options="serverOptions" 
          :server-items-length="serverItemsLength"
          :loading="loading"
          :rows-items="rowsItems"
          :sort-by="sortBy"
          :sort-type="sortType"
          @update-sort="updateSort"
          show-index
          border-cell
          buttons-pagination/>
  </div>
</template>
<script lang="ts">
import easyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css';

export default {
  props:{
      headers: {
          type: Array,
          required: true
      },
      url:{
          type: String,
          requried: true
      },
      sort: {
          type: Boolean,
          required: false
      },
  },  
  components: {easyDataTable},
  data(){
      return {
          items: [],
          loading: false,
          serverItemsLength: 0,
          serverOptions : {
              page: 1,
              rowsPerPage: 5,                
          },
          rowsItems: [5, 10, 20, 40, 80],
          sortBy: 'id',
          sortType: 'asc',
      }
  },
  mounted(){
      this.getServerData()
  },
  methods: {
      async getServerData(){
          this.loading = true
          await this.axios.get(`${this.url}?page=${this.serverOptions.page}&limit=${this.serverOptions.rowsPerPage}&sortBy=${this.sortBy}&sortType=${this.sortType}`)
          .then(response => {
              // console.log(response.data.data);
              this.items = response.data.data;
              this.serverItemsLength = response.data.total
              this.loading = false
          })
          .catch(function (error) {
              console.error(error);
          });
      },
      updateSort(val){
          if(this.sort){
              this.sortBy = val.sortBy
              this.sortType = val.sortType
          }
      }
  },
  watch: {
    serverOptions(value) {
      this.serverOptions.page = value.page
    //   this.getServerData()
    },
  },
}
</script>
