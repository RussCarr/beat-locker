<template>
  <div class="home">
    <topBar></topBar>
    <navbar></navbar>
    Home Page
  </div>
</template>

<script>
  import TopBar from './TopBar'
   import Navbar from './Navbar'
  export default {
    name: 'Home',
    components: {
      topBar: TopBar,
      navbar: Navbar
    },
    data() {
      return {
       
      }
    }
  
  }
</script>

<style scoped>
</style>