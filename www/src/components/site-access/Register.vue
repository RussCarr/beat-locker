<template>
  <div class="background">
    <div class="register container mt-4">

      <errorMsg v-if="authError.error">{{authError.message}}</errorMsg>

      <form action="#" class="border border-secondary rounded p-4" @submit.prevent="submit">
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
          <input type="text" id="bio" class="form-control" v-model="user.bio" placeholder="Who I am...">
        </div>
        <button type="submit" class="btn btn-success px-4">Register</button>
        <button class="btn btn-success px-4" @click="closeModal">Close</button>
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

  div.register {
    width: 95%;
  }

  @media (min-width: 576px) {
    div.register {
      width: 50%;
    }
  }

  form {
    background-color: rgb(219, 219, 219);
  }

</style>
