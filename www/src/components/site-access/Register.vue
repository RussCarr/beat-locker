<template>
  <div class="background">
    <div class="register">

      <errorMsg v-if="authError.error">{{authError.message}}</errorMsg>

      <form class="p-4" action="#" @submit.prevent="submit">
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
          <input type="text" id="bio" class="form-control" v-model="user.bio" placeholder="Tell us about yourself">
        </div>
        <button type="submit" class="btn btn-primary registerButton px-4">Register</button>
        <button class="btn btn-secondary px-4" @click="closeModal">Close</button>
      </form>
      <div class="text-center pt-4">
        <a href="#" class="text-muted" @click.prevent="showSignInForm">Already registered? Sign in here.</a>
      </div>
    </div>
  </div>
</template>

<script>
  import ErrorMsg from './ErrorMsg'
  export default {
    name: 'Register',
    components: {
      errorMsg: ErrorMsg
    },
    data() {
      return {
        user: {
          name: "",
          email: "",
          password: "",
          imgUrl: "",
          bio: ""
        }
      }
    },
    computed: {
      authError() {
        return this.$store.state.authError
      }
    },
    methods: {
      submit() {
        this.$store.dispatch('registerUser', this.user)
      },
      showSignInForm() {
        this.$emit('showSignInForm')
        this.$emit('closeRegisterModal')
      },
      closeModal() {
        this.$emit('closeRegisterModal')
      }
    }
  }

</script>

<style scoped>
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

  .register {
    width: 95%;
    background-position: center;
    background-color: rgba(206, 33, 53, 1.0);
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-radius: 4px;
  }

  @media (min-width: 576px) {
    div.register {
      width: 50%;
    }
  }

  .registerForm {
    padding: 1rem;
  }

  form {
    background-color: rgba(55, 37, 41, 1.0);
    color: rgba(251, 251, 251, 1.0);
  }

  .registerButton {
    background-color: rgba(57, 123, 172, 1.0);
    border-color: rgba(33, 92, 136, 1.0);
    transition: all;
    transition-duration: 400ms;
  }

  .registerButton:hover {
    background-color: rgba(33, 92, 136, 1.0);
    border-color: rgba(33, 92, 136, 1.0);
  }

  .registerButton:active,
  .registerButton:visited,
  .registerButton:focus {
    background-color: rgba(33, 92, 136, 1.0);
    border-color: rgba(33, 92, 136, 1.0);
  }

  .button {
    display: flex;
    justify-content: flex-end;
    align-self: center;
  }

</style>
