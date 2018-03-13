<template>
  <div class="mainbar bgcolor">
    
    <div class="container-fluid d-flex align-items-center justify-content-between pt-3 pb-2 px-4">
        <div>
            <h1 class="h3 d-inline text-light font-weight-bold">beat-locker</h1>
        </div>
        <div>
            <span class="h5 text-light">{{user.name}}</span>
        </div>
    </div>
    <div class="navbar container-fluid row text-light">
        <div class="container-fluid py-3 px-5">
  
          <div class="homelink navlink col-4 text-center py-3 rounded" @click="">
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
        name: 'NavBar',
        data() {
            return {

            }
        },
        computed: {
            user() {
                return this.$store.state.user
            }
        },
        methods: {
            showBoardsList() {
                this.$router.push('Home')
            },
            logout() {
                this.$store.dispatch('logoutUser')
            }
        }
    }
</script>

<style scoped>
    img {
        width: 25px;
        margin-bottom: 0.4rem;
        margin-right: 0.5rem;
    }

    .logout {
        flex-direction: row-reverse;
        align-self: center;
        display: flex
    }
    
    .menu {
        flex-direction: row;
        align-self: center;
        display: flex
    }
    
    .bgcolor {
        background-color: #5c5f5f;
    }
    .navbar {
        width: 100%;
        padding: 0;
        margin: 0;
        background-color: #717e00;
    }
    
    .navlink:hover {
        cursor: pointer;
        background-color: #fad815;
    }
</style>