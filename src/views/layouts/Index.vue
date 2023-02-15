<script lang="ts">
import Nav from './Nav.vue'
export default {
  props:{},
  components: {Nav},
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
<style lang="scss">
</style>