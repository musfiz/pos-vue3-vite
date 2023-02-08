<script lang="ts">
import Nav from './views/layouts/Nav.vue'
export default {
  data(){
    return {
      user: {name: 'nameb'}
    }
  }
}
</script>

<template>
  <div>
    <main role="main" class="container-xxl">
      <Nav />
      <div class="p-4 bg-white rounded shadow-md" style="margin-top: 70px">
        <router-view/>        
      </div>
    </main>
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
