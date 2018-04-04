<template>
  <div class="Apps">
    <router-view/>
      </div>
</template>

<script>
  export default {
    name: 'App',
    mounted() {
      this.$store.dispatch('authenticateUser')
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>