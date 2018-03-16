<template>
  <div class="userEditForm">
    <div class="row">
      <div class="col">
        <div class="col-sm-10"></div>
        <div class="col-sm-2  d-flex">
          <h6 @click="openSideBar" @OpenSideBar="openSideBar" class="sideBarLayout edit-profile-cursor">
            <i class="far fa-edit"></i>Edit Profile</h6>
        </div>
      </div>
    </div>
    <div v-if="showSideBar" class="bar">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <h3>Profile Edit Form</h3>
              </div>

              <div class="modal-body">

                <form action="#" class="border border-secondary" @submit.prevent="submit">
                  <div class="form-group">
                    <label class="ml-4" for="username">Name: </label>
                    <input type="text" id="username" class="form-control" v-model="user.name" placeholder="My Name">
                  </div>
                  <div class="form-group">
                    <label class="ml-4" for="email">Email: </label>
                    <input type="text" id="email" class="form-control" v-model="user.email" placeholder="my@address.com">
                  </div>
                  <div class="form-group">
                    <label class="ml-4" for="password">Password: </label>
                    <input type="password" id="password" class="form-control" v-model="user.password" placeholder="********">
                  </div>
                  <div class="form-group">
                    <label class="ml-4" for="imgUrl">Image URL: </label>
                    <input type="text" id="imgUrl" class="form-control" v-model="user.imgUrl" placeholder="http://my/photo/somewhere.com">
                  </div>
                  <div class="form-group">
                    <label class="ml-4" for="bio">Brief bio: </label>
                    <textarea type="text" id="bio" class="form-control" v-model="user.bio" rows="3" placeholder="Who I am..."></textarea>
                  </div>
                </form>

              </div>

              <div class="modal-footer">
                <div name="footer">
                  <button class="btn btn-primary okButton px-4" @click="close">
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
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserProfile',


    data() {
      return {
        showSideBar: false,
        user: {
          name: "",
          email: "",
          password: "",
          imgUrl: "",
          bio: ""
        }
      }
    },
    methods: {
      submit() {
        this.$store.dispatch('registerUser', this.user)
      },
      close() {
        this.showSideBar = false
      },
      openSideBar() {
        this.showSideBar = true
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

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 800px;
    margin: 0px auto;
    background-color: rgba(206, 33, 53, 1.0);
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: rgba(251, 251, 251, 1.0);
    border-bottom-color:  rgba(206, 33, 53, 1.0);
  }

  .modal-footer {
    border-top-color:  rgba(206, 33, 53, 1.0);
  }

  .modal-body {
    background-color: rgba(55, 37, 41, 1.0);
    color: rgba(251, 251, 251, 1.0);
  }

  .modal-default-button {
    float: right;
  }

  /*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  .tabs-right {
    border-left: 1px solid #ddd;
  }

  .tabs-right>li {
    margin-left: -1px;
  }

  .tabs-right>li.active>a,
  .tabs-right>li.active>a:hover,
  .tabs-right>li.active>a:focus {
    border-bottom: 1px solid #ddd;
    border-left-color: transparent;
  }

  .tabs-right>li>a {
    border-radius: 0 4px 4px 0;
    margin-right: 0;
  }

  .tabs-left,
  .tabs-right {
    border-bottom: none;
    padding-top: 2px;
  }

  sideBarLayout {
    border: 2px solid black;
  }
</style>