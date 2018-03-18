<template>
  <div class="userEditForm">
    <div class="row">
      <div class="col">
        <div class="col-sm-10"></div>
        <div class="col-sm-2  d-flex">
          <h6 @click="launchEditUser" @LaunchEditUser="launchEditUser(this.user)" class="editUserLayout edit-profile-cursor">
            <i class="far fa-edit"></i>Edit Profile</h6>
        </div>
      </div>
    </div>
    <div v-if="showEditUser" class="bar">
      <div class="background">
        <div class="editUser overflow-scroll">
          <div class="row">
            <div class="col-sm-12">
              <h4>Profile Edit Form</h4>
            </div>
          </div>
          <form action="#" @submit.prevent="submit">
            <div class="row">
              <div class="form-group col-sm-6">
                <label class="ml-4" for="username">Name: </label>
                <input type="text" id="username" class="form-control" v-model="user.name" placeholder="Name">
              </div>
              <div class="form-group col-sm-6">
                <label class="ml-4" for="email">Email: </label>
                <input type="text" id="email" class="form-control" v-model="user.email" placeholder="my@address.com">
              </div>
            </div>
            <div class="row">
              <div class="form-group col-sm-6">
                <label class="ml-4" for="password">Password: </label>
                <input type="password" id="password" class="form-control" v-model="user.password" placeholder="********">
              </div>
              <div class="form-group col-sm-6">
                <label class="ml-4" for="imgUrl">Image URL: </label>
                <input type="text" id="imgUrl" class="form-control" v-model="user.imgUrl" placeholder="http://my/photo/somewhere.com">
              </div>
            </div>
            <div class="row">
              <div class="form-group col-sm-6">
                <label class="ml-4" for="age">Age: </label>
                <input type="number" id="age" class="form-control" v-model="user.age" placeholder="Age">
              </div>
              <div class="form-group col-sm-6">
                <label class="ml-4" for="genres">Genres: </label>
                <input type="text" id="genres" class="form-control" v-model="user.genres" placeholder="Your favorite genres">
              </div>
            </div>
            <div class="row">
              <div class="form-group col-sm-6">
                <label class="ml-4" for="interests">Interests:</label>
                <input type="text" id="interests" class="form-control" rows="2" v-model="user.interests" placeholder="Interests">
              </div>
              <div class="form-group col-sm-6">
                <label class="ml-4" for="bio">Brief bio: </label>
                <textarea type="text" id="bio" class="form-control" v-model="user.bio" placeholder="Who I am..."></textarea>
              </div>
            </div>
          </form>
          <div name="footer">
            <button type="submit" class="btn btn-primary okButton px-4" @click.prevent="submit" @click="close">
              OK
            </button>
            <button class="btn btn-secondary px-4" @click="close">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserProfile',


    data() {
      return {
        showEditUser: false,
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      submit() {
        var updatedUser = {
          _id: this.user._id,
          name: this.user.name,
          email: this.user.email,
          imgUrl: this.user.imgUrl,
          age: this.user.age,
          genres: this.user.genres,
          interests: this.user.interests,
          bio: this.user.bio
        }
        this.$store.dispatch('editUser', updatedUser)
      },
      close() {
        this.showEditUser = false
      },
      launchEditUser() {
        this.showEditUser = true
      },
    },

  }
</script>

<style>
  .form-group {
    color: black;
    color: rgba(251, 251, 251, 1.0);
  }

  .okButton {
    background-color: rgba(57, 123, 172, 1.0);
    border-color: rgba(33, 92, 136, 1.0);
    transition: all;
    transition-duration: 400ms;
  }

  .okButton:hover {
    background-color: rgba(33, 92, 136, 1.0);
    border-color: rgba(33, 92, 136, 1.0);
  }

  .okButton:active,
  .okButton:visited,
  .okButton:focus {
    background-color: rgba(33, 92, 136, 1.0);
    border-color: rgba(33, 92, 136, 1.0);
  }

  .sidebar {
    display: flex
  }

  .edit-profile-cursor {
    cursor: pointer;
  }

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

  .editUser {
    width: 95%;
    background-color: rgba(206, 33, 53, 1.0);
    padding: 1rem;
    border-radius: 4px;
  }

  @media (min-width: 576px) {
    div.editUser {
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

  editUserLayout {
    border: 2px solid black;
  }
</style>