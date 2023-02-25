<script lang="ts">
import Login from './views/auth/Login.vue'
import Index from './views/layouts/Index.vue'
import { mapActions } from 'vuex';
export default {
  components: {Login, Index},
  computed: {
    layout():string{
      return this.$store.getters.isLayout
    }    
  },
  methods: {
    ...mapActions(['category', 'vendor']),
  },
  mounted(){
    if(this.layout == 'Index'){
      this.category()
      this.vendor()
    }
  }
}
</script>

<template>
  <div>
      <component :is="layout"></component>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
