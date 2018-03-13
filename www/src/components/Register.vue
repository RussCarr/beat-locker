<template>
  <div class="register container mt-4">

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

      <button type="submit" class="btn btn-success px-4">Register</button>

    </form>

    <div class="text-center pt-4">
      <a href="#" class="text-muted" @click.prevent="showSignInForm">Already registered? Sign in here.</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      user: {
        name: "",
        email: "",
        password: ""
      }
    }
  },
  methods: {
    submit() {
      this.$store.dispatch('registerUser', this.user)
    },
    showSignInForm() {
      this.$emit('showSignInForm')
    }
  }
}
</script>

<style scoped>
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
