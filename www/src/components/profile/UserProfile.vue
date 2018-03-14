<template>
  <div class="userProfile">
    <h1>Profile</h1>
    <ul>
      <li>Profile Pic</li>
      <li>Name</li>
      <li>Age</li>
      <li>Bio</li>
      <li>Music Style</li>
      <li>Intrests</li>
    </ul>
    <userEditForm></userEditForm>
    
  </div>
</template>

<script>
  import UserEditForm from './UserEditForm'

  export default {
    name: 'UserProfile',
    components: {
      userEditForm: UserEditForm,
    }
  }
</script>

<style>
</style>