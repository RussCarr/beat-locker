<template>
  <div class="welcome text-dark">
    <div class="pb-5">
      <navBar></navBar>

      <div class="welcome-message container">
        <h1 class="text-center m-3">Welcome!</h1>
        <p>Use this beat creating app to for music projects.</p>
        <ul>
          <li>Register/sign-in to access your private account</li>
        </ul>
      </div>

      <errorMsg v-if="authError.error">{{authError.message}}</errorMsg>

      <signIn v-on:showRegisterForm="showSignIn = false" v-if="showSignIn"></signIn>

      <register v-on:showSignInForm="showSignIn = true" v-if="!showSignIn"></register>
    </div>
  </div>
</template>

<script>
  import NavBar from './NavBar'
  import ErrorMsg from './site-access/ErrorMsg'
  import SignIn from './site-access/SignIn'
  import Register from './site-access/Register'
  export default {
    name: 'Welcome',
    components: {
      navBar: NavBar,
      errorMsg: ErrorMsg,
      signIn: SignIn,
      register: Register
    },
    data() {
      return {
        showSignIn: true
      }
    },
    computed: {
      authError() {
        return this.$store.state.authError
      }
    }
  }
</script>

<style scoped>
  .welcome-message {
    max-width: 600px;
  }

  @media (min-width: 576px) {
    .welcome-message {
      width: 75%;
    }
  }
</style>