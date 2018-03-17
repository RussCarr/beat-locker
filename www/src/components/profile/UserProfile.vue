<template>
  <div class="userProfile">
    <div class="container-fluid">
      <navbar></navbar>
      <div class="row">
        <div class="col-5">
          <userEditForm></userEditForm>
        </div>
        <div class="col-6">
          <h1>Profile</h1>
        </div>
        <div class="col-1">
          <sidebar></sidebar>
        </div>
      </div>
      <div class="row">

        <div class="col-4">
          <div class="profile-img">
            <img :src="user.imgUrl" class="img-fluid" alt="Responsive image">
          </div>
        </div>
        <div class="col-7 mt-5">
          <ul>
            <li>Name: {{user.name}}</li>
            <li>Age: {{user.age}}</li>
            <li>Bio: {{user.bio}}</li>
            <li>Music Style: {{user.style}}</li>
            <li>Interests: {{user.interests}}</li>
            <li>Genres: {{user.genres}}</li>
          </ul>
        </div>

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
    display: flex;
  }

  .profile-img {
    width: 250px;
    height: 250px;
    margin-left: 2rem;
    margin-top: 2rem;
  }
</style>