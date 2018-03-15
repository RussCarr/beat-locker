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
            <img class="my-5 ml-5" src="http://placehold.it/300x300">
            <form action="upload.php" method="post" enctype="multipart/form-data">
              <input type="file" name="fileToUpload" id="fileToUpload">
              <input type="submit" value="Upload Image" name="submit">
            </form>
          </div>
          <div class="col-7 mt-5">
            <ul>
              <li>Name:  {user.name}</li>
              <li>Age:  {user.name}</li>
              <li>Bio:  {user.name}</li>
              <li>Music Style:  {user.name}</li>
              <li>Intrests:  {user.name}</li>
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
  }
</script>

<style>
  .userProfile {
    color: white;
    display: flex;
  }
</style>