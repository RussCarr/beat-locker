<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="row">
        <div class="col-sm-12">
          <navbar></navbar>
        </div>
      </div>
    </div>
    <div class="row userProfile justify-content-between">
      <div class="col-sm-5">
        <!-- <userEditForm></userEditForm> -->
      </div>
      <div class="col-sm-5">
      </div>
      <div class="col-1">
        <sidebar></sidebar>
      </div>
    </div>

    <div class="col-sm-12 profile-top-margin">
      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-3 centerFlex profile-bg-img profile-pad">
          <div class="profile-img">
            <img :src="user.imgUrl" class="img-fluid" alt="Responsive image">
          </div>
        </div>
        <div class="col-sm-5 profile-pad centerFlex">
          <div class="div profile-text">
            <p class="h4">Profile</p>
            <ul>
              <li>Name: {{user.name}}</li>
              <li>Age: {{user.age}}</li>
              <li>Bio: {{user.bio}}</li>
              <li>Interests: {{user.interests}}</li>
              <li>Genres: {{user.genres}}</li>
            </ul>
            <userEditForm></userEditForm>
          </div>
        </div>
        <div class="col-sm-2"></div>
      </div>
    </div>
  </div>




</template>

<script>
  import UserEditForm from './UserEditForm'
  import Navbar from '../Navbar'
  import SideBar from '../SideBar'
  export default {
    name: 'Home',
    components: {
      navbar: Navbar,
      sidebar: SideBar,
      userEditForm: UserEditForm
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    }
  }
</script>

<style scoped>
  .userProfile {
    color: white;
  }

  .profile-img {
    width: 250px;
    height: 250px;
    background-color: black;
    outline-color: black;
    outline-style: solid;
    outline-width: 2px;
    overflow: hidden;

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