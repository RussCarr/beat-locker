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
  /* body {
    background-image: url('https://files.slack.com/files-pri/T1GGQN1RU-F9NS2NNLQ/image.png');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center; 
  background-size: cover;
  } */
</style>