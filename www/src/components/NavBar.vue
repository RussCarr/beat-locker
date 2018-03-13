<template>
  <div class="wrapper">

    <div class="navbar container-fluid row text-light">
      <div class="container-fluid py-3 px-5">

        <div class="homelink navlink col-4 text-center py-3 rounded" @click="showBoardsList">
          Home
        </div>
    
        <div class="logout navlink col-4 text-center py-3 rounded" @click="logout">
          Logout
        </div>

      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: 'Navbar',
    components: {
      
    },
    data() {
      return {
       
      }
    },
    computed: {
      isHomeRoute() {
        return this.$route.path === "/Home" || this.$route.path === "/home"
      },
         },
    methods: {
   
      logout() {
        this.$store.dispatch('logoutUser')
      }
    }
  }
</script>

<style scoped>
    .navbar {
        width: 100%;
        padding: 0;
        margin: 0;
        background-color: #007e70;
    }
    
    .navlink:hover {
        cursor: pointer;
        background-color: #006559;
    }
</style>