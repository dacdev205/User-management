<script>
import AppHeader from "./components/AppHeader.vue"

  export default {
    components:{AppHeader}
  } 
</script>

<template>
  <div id="app">
    <AppHeader></AppHeader>
    <div class="container">
      <router-view/>
    </div>
  </div>
  </template>
 
<style>

</style>