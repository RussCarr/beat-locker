<template>
  <div class="home">
    <navbar></navbar>
    Home Page
  </div>
</template>

<script>
  import Navbar from './Navbar'
  export default {
    name: 'Home',
    components: {
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