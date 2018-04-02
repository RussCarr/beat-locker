<template>
  <div class="navtop bgcolor container-fluid">
    <div class="row bg-img d-flex align-items-center pt-3 pb-2 px-4">
      <div class="col-sm-8">
        <div class="text-center">
          <img class="logo align-self-center" @click="home" src="../assets/images/beat-locker-logo-large-white.png">
        </div>
      </div>
      <div class="col-sm-1 user">
        <!-- <img class="user-image" @click='userProfile' v-model="user.imgUrl" id="imgUrl" :src="user.imgUrl"> -->
        <img class="user-image" @click='userProfile' v-model="user.imgUrl" id="imgUrl" :src="imgUrl">
      </div>
      <div class="col-sm-2 user">
        <div class="row">
          <div class="col-sm-12">
            <div class="h5 user-name text-light" @click='userProfile'>{{user.name}}</div>
          </div>
        </div>

      </div>
    </div>

    <!-- COMMENTING OUT PREVIOUS NAVBAR FOR NOW
    <div class="row">
      <nav class="navbar subNavbar">
        <div class="homelink SubNavlink col-sm-2 text-center py-3 rounded" v-if="isHomeRoute" @click="newProject">
          New Project
        </div>
        <div class="homelink SubNavlink col-sm-2 text-center py-3 rounded" v-if="!isHomeRoute" @click="home">
          Home
        </div>
        <div class="homelink SubNavlink col-sm-2 text-center py-3 rounded" @click="allSharedProjects">
          Community
        </div>
        <div class="homelink SubNavlink col-sm-2 text-center py-3 rounded" @click="getMyBeatsDrop(user)">
          My Beats
        </div>
        <div class="homelink SubNavlink col-sm-2 text-center py-3 rounded" @click="getSearchField">
          Search
        </div>
        <div class="homelink SubNavlink col-sm-2 text-center py-3 rounded" @click="logout">
          Logout
        </div>
      </nav>
    </div> -->

    <!-- RESPONSIVE NAVBAR -->
    <nav class="navbar navbar-expand-md navbar-custom">
      <a class="navbar-brand" @click="home">Home</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCustom">
        <i class="fa fa-bars fa-lg py-1 text-white"></i>
      </button>
      <div class="navbar-collapse collapse mx-2" id="navbarCustom">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" @click="newProject">New Project</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="allSharedProjects">Community</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="getMyBeatsDrop(user)">My Beats</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logout">Logout</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0 ml-auto">
          <input class="form-control mr-sm-2" v-model="search" name="search" type="search" placeholder="Search tracks">
          <button class="btn search-button my-2 mr-2 my-sm-0" type="submit" @click.prevent="getSearchResults">Search</button>
        </form>
        <!-- <button class="btn btn-secondary my-2 my-sm-0" @click="logout">Logout</button> -->
      </div>
    </nav>


    <!-- myBeatsDrop HERE     -->
    <div class="row">
      <myBeatsDrop v-if="showMyBeatsDrop" v-on:closeMyBeatsDrop="showMyBeatsDrop = false"></myBeatsDrop>
    </div>
  </div>
</template>

<script>
  import MyBeatsDrop from './MyBeatsDrop'
  export default {
    name: 'Navbar',
    data() {
      return {
        showMyBeatsDrop: false,
        search: '',
      }
    },
    components: {
      myBeatsDrop: MyBeatsDrop,
    },
    computed: {
      isHomeRoute() {
        return this.$route.path === "/Home" || this.$route.path === "/home"
      },
      user() {
        return this.$store.state.user
      },
      imgUrl() {
        var imgUrl = this.user.imgUrl
        if (!imgUrl) {
          imgUrl = "https://robohash.org/" + this.user.name + ".png"
        }
        return imgUrl
      }
    },
    methods: {
      toggleMyBeatsDrop() {
        this.showMyBeatsDrop = this.showMyBeatsDrop ? false : true
      },
      logout() {
        this.$store.dispatch('logoutUser')
      },
      userProfile() {
        this.$router.push({ path: '/UserProfile' })
      },
      help() {
        this.$router.push('Help')
      },
      getMyBeatsDrop(user) {
        this.getProjects(user);
        this.toggleMyBeatsDrop();
      },
      newProject() {
        // First, save the current project.
        var data = {
          project: this.$store.state.activeProject,
          tracks: this.$store.state.activeTracks
        }
        this.$store.dispatch('saveProject', data).then(() => {
          // Then, create a new default project and display it.
          this.$store.dispatch('createProject', this.user._id)
        })
        this.$router.push({ path: '/home' })
      },
      allSharedProjects() {

        this.$router.push({ path: '/Explorer' })
      },
      home() {
        this.$router.push({ path: '/home' })
      },
      getSearchResults() {
        var query = this.search
        this.$store.dispatch('searchProjects', query)
        this.$router.push({ path: '/SearchResults' })
      },
      getProjects(user) {
        this.$store.dispatch('getUserProjects', user._id)
      }
    }
  }

</script>

<style scoped>
  /* div {
    outline-color: blueviolet;
    outline-style: solid;
    outline-width: 1px;
  } */

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

  .user-name {
    cursor: pointer;
  }

  .toggle-button {
    color: white;
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
    background-color: rgba(150, 16, 33, 1.0);
    border-bottom-color: rgba(251, 251, 251, 1.0);
    border-bottom-style: solid;
    border-bottom-width: 1px;
  }

  .subNavbar {
    width: 100%;
    padding: 0;
    margin: 0;
    color: (251, 251, 251, 1.0);
    color: rgba(251, 251, 251, 1.0);
    background-color: rgba(55, 37, 41, 1.0);
    border-bottom-color: rgba(180, 26, 44, 1.0);
    border-bottom-style: solid;
    border-bottom-width: 1px;
  }

  .SubNavlink:hover {
    cursor: pointer;
    background-color: rgba(180, 26, 44, 1.0);
  }

  .user-image {
    border-radius: 250px;
    background-image: url("../assets/images/user-user.png");
    background: black;
    padding: 2px;
    width: 100px;
    height: 100px;
    cursor: pointer;
  }

  .search-button {
    color: white;
    background-color: rgba(57, 123, 172, 1.0);
    border-color: rgba(33, 92, 136, 1.0);
    transition: all;
    transition-duration: 400ms;
  }

  .search-button:hover {
    background-color: rgba(33, 92, 136, 1.0);
    border-color: rgba(33, 92, 136, 1.0);
  }

  .search-button:active,
  .search-button:visited,
  .search-button:focus {
    background-color: rgba(33, 92, 136, 1.0);
    border-color: rgba(33, 92, 136, 1.0);
  }

  .navbar-custom {
    width: 100%;
    /* padding: 0; */
    margin: 0;
    color: (251, 251, 251, 1.0);
    color: rgba(251, 251, 251, 1.0);
  }

  /* change the brand and text color */

  .navbar-custom .navbar-brand,
  .navbar-custom .navbar-text {
    color: rgba(255, 255, 255, 1.0);
  }

  /* change the link color */

  .navbar-custom .navbar-nav .nav-link {
    color: rgba(255, 255, 255, .5);
  }

  /* change the color of active or hovered links */

  .navbar-custom .nav-item.active .nav-link,
  .navbar-custom .nav-item:hover .nav-link {
    color: #ffffff;
    cursor: pointer;
  }

  /* for dropdown only - change the color of droodown */

  .navbar-custom .dropdown-menu {
    background-color: rgba(107, 32, 45, 1.0);
  }

  .navbar-custom .dropdown-item {
    color: #ffffff;
  }

  .navbar-custom .dropdown-item:hover,
  .navbar-custom .dropdown-item:focus {
    color: #333333;
    background-color: rgba(255, 255, 255, .5);
  }

  .navbar-toggler-icon {
    color: white;
  }

  .navbar-brand {
    cursor: pointer;
  }
</style>