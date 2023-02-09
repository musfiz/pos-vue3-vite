<script lang="ts">
import Login from './views/auth/Login.vue'
import Index from './views/layouts/Index.vue'
export default {
  components: {Login, Index},
  data(){
    return {
      layout: 'Index'
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
