<template>
  <div class="navtop bgcolor container-fluid">
    <div class="row bg-img d-flex align-items-center pt-3 pb-2 px-4">
      <div class="col-sm-8">
        <div class="text-center">
          <img class="logo align-self-center" @click="home" src="../assets/images/beat-locker-logo-large-white.png">
        </div>
      </div>
      <div class="col-sm-1 user">
        <img class="user-image" @click='userProfile' src="../assets/images/user-user.png">
      </div>
      <div class="col-sm-2 user">
        <div class="h5 text-light">{{user.name}}</div>
      </div>
    </div>
    <div class="row">
      <nav class="navbar subNavbar">
        <div class="homelink SubNavlink col-3 text-center py-3 rounded" v-if="isHomeRoute" @click="newProject">
          New Project
        </div>
        <div class="homelink SubNavlink col-3 text-center py-3 rounded" v-if="!isHomeRoute" @click="home">
            Home
          </div>
        <div class="homelink SubNavlink col-3 text-center py-3 rounded" @click="community">
          Community
        </div>
        <div class="homelink SubNavlink col-3 text-center py-3 rounded" @click="help">
          Help
        </div>
        <div class="homelink SubNavlink col-3 text-center py-3 rounded" @click="logout">
          Logout
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
    data() {
      return {

      }
    },
    computed: {
      isHomeRoute() {
        return this.$route.path === "/Home" || this.$route.path === "/home"
      },
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logoutUser')
      },
      userProfile() {
        this.$router.push({path: '/UserProfile'})
      },
      help() {
        this.$router.push('Help')
      },
      newProject() {
        this.$store.dispatch('createProject', this.user._id)
        this.$router.push('Home')
      },
      community() {
        this.$router.push({path: '/Explorer'})
      },
      home() {
        this.$router.push({path: '/home'})
      }
    }
  }

</script>

<style scoped>
  .logout {
    flex-direction: row-reverse;
    align-self: center;
    display: flex
  }

  .user {
    margin-left: 1rem;
    margin-right: 1rem;
    text-align: center;
  }

  .logo {
    width: 90%;  
    max-width: 500px; 
  }

  .logo:hover {
    cursor: pointer;
  }

  .menu {
    flex-direction: row;
    align-self: center;
    display: flex;
  }

  .bg-img {
    background-position: top;
    background-image: url('../assets/images/beat-locker-splash-bg.jpg');
    background-repeat: no-repeat;
  }

  .navtop {
    background-color: #5c5f5f;
  }

  .subNavbar {
    width: 100%;
    padding: 0;
    margin: 0;
    color: (251, 251, 251, 1.0);
    color: rgba(251, 251, 251, 1.0);
    background-color:rgba(55, 37, 41, 1.0);
    border-bottom-color:  rgba(180, 26, 44, 1.0);
    border-bottom-style: solid;
    border-bottom-width: 1px;
  }

  .SubNavlink:hover {
    cursor: pointer;
    background-color: rgba(180, 26, 44, 1.0) ;
  }

  .user-image {
    border-radius: 250px;
    background: black;
    padding: 2px;
    width: 100px;
    height: 100px;
  }
</style>