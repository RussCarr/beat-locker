<template>
  <div class="container-fluid background">
    <div class="user-profile-wrapper overflow-scroll">
      <div class="row">
        <div class="col-sm-12 text-center">
          <h4 class="text-center">User Profile</h4>
          <p>{{user.name}} - {{user.age}}</p>
          <hr>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <img :src="user.imgUrl" class="img text-center" alt="Responsive image">
        </div>
        <div class="row">
          <div class="col-sm-12 mx-1">
            <hr>
            <p class="px-5">{{user.bio}}</p>
            <hr>
          </div>
        </div>
      </div>
      <div class="col-sm-12">
        <div class="row justify-content-center">
          <h5 class="text-center">My Shared Tracks</h5>
          <div class="col-sm-12">
            <viewUserProjects v-for="userSharedProject in userSharedProjects" :key="userSharedProject._id" :userSharedProject='userSharedProject'></viewUserProjects>
          </div>
        </div>

        <div class="col-sm-2"></div>
        <p>Interests: {{user.interests}}</p>
        <p>Genres: {{user.genres}}</p>
        <button class="btn btn-secondary close-button" @click="close">
          Close
        </button>
      </div>
    </div>

  </div>
</template>

<script>
  import ViewUserProjects from './ViewUserProjects'
  export default {
    name: 'ViewUserProfile',
    components: {
      viewUserProjects: ViewUserProjects
    },
    computed: {
      user() {
        var projectUsers = this.$store.state.activeProjectUsers
        return projectUsers.find(user => user._id === this.$store.state.projectPreview.userId)
      },

      userSharedProjects(category) {
        var allUserProjects = this.$store.state.allProjects;
        var userSharedProjects = allUserProjects.filter(project => {
          return project.shared === true && project.userId === this.user._id
        })
        userSharedProjects.sort(function (a, b) { return b.createAt - a.createAt })
        return userSharedProjects
      }
    },
    methods: {
      close() {
        this.$emit('closeProfile')
      }
    }
  }
</script>

<style scoped>
  /* div {
    outline-style: solid;
    outline-color: skyblue;
    outline-width: 1px;
  } */

  .userProfile {
    color: white;
  }

  .user-profile-wrapper {
    padding: 1rem;
    background-color: rgba(206, 33, 53, 1.0);
  }

  .img {
    padding: 10px;
    width: 120px;
    height: 120px;
    background-color: black;
    /* outline-color: black;
      outline-style: solid; */
    outline-width: 2px;
    /* border-radius: 100%; */
  }

  /* div {
    outline-color: slateblue;
    outline-style: solid;
    outline-width: 1px;
  } */

  .background {
    background-color: rgba(0, 0, 0, .8);
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .profile-text {
    color: white;
    background-color: rgba(206, 33, 53, 1.0);
    padding: 1rem;
  }

  .centerFlex {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .profile-bg-img {
    background-position: top;
    background-image: url("../../assets/images/beat-locker-splash-bg.jpg");
    background-repeat: no-repeat;
  }

  .profile-pad {
    padding: 2rem;
    background-position: top;
    background-image: url("../../assets/images/beat-locker-splash-bg.jpg");
    background-repeat: no-repeat;
  }

  .profile-margin {
    margin: 2rem;
  }

  .profile-top-margin {
    margin-top: 2rem;
  }

  .below-nav {
    margin-bottom: 2rem;
  }

  @media (min-width: 576px) {
    div.user-profile-wrapper {
      width: 50%;
    }
  }

  .overflow-scroll {
    overflow-y: scroll;
    margin-top: 2rem;
    margin-bottom: 2rem;
    max-height: 90%;
    max-width: 90%;
  }

  .close-button {
    background-color: rgba(57, 123, 172, 1.0);
    border-color: rgba(33, 92, 136, 1.0);
    transition: all;
    transition-duration: 400ms;
  }

  .close-button:hover {
    background-color: rgba(33, 92, 136, 1.0);
    border-color: rgba(33, 92, 136, 1.0);
  }

  .close-button:active,
  .close-button:visited,
  .close-button:focus {
    background-color: rgba(33, 92, 136, 1.0);
    border-color: rgba(33, 92, 136, 1.0);
  }
</style>