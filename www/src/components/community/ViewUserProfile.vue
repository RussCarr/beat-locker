<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 text-center">
        <h3 class="text-center">User Profile</h3>
        <p>{{user.name}} - {{user.age}}</p>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-3">
        <img :src="user.imgUrl" class="img" alt="Responsive image">
      </div>
      <div class="col-sm-7 ml-3">
        <p>Music Style:</p>
        <p>{{user.style}}</p>
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
      <div class="row">
        <p class="h4">My Shared Tracks</p>
        <div class="col-sm-12"></div>
    <viewUserProjects v-for="userSharedProject in userSharedProjects" :key="userSharedProject._id" :userSharedProject='userSharedProject'></viewUserProjects>
      </div>

      <div class="col-sm-2"></div>
      <p>Interests: {{user.interests}}</p>
      <p>Genres: {{user.genres}}</p>
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
    props: ['allSharedProjects'],
    computed: {
      user() {
        return this.$store.state.user
      },
   
      userSharedProjects(category) {
        var allUserProjects = this.$store.state.allProjects;
        var userSharedProjects = allUserProjects.filter(project => {
          return project.shared === true && project.userId === this.user._id
        })
        userSharedProjects.sort(function (a, b) { return b.createAt - a.createAt })
        return userSharedProjects
      }
    }
  }
</script>

<style scoped>
  .userProfile {
    color: white;
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
</style>