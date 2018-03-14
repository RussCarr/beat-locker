<template>
  <div class="welcome">
    <div class="container-fluid">
      <div class="row welcome-area align-items-center">
        <div class="col-sm-12">
          <div class="welcome-boxes">
            <img src="../assets/images/beat-locker-logo-large-white.png" alt="beatlocker" class="logo-img">
          </div>
          <div class="welcome-boxes">
            <img src="../assets/images/beat-locker-tagline-twoline-large-white.png" alt="beatlocker tagline" class="logo-img">
          </div>
          <div class="welcome-boxes">
            <button class="btn btn-primary buttons-welcome px-4" @click="launchSignIn">Sign in</button>
            <button class="btn btn-primary buttons-welcome px-4" @click="launchRegister">Register</button>
          </div>
        </div>
      </div>
    </div>
    <signIn v-on:showRegisterForm="showRegister = true" v-on:closeSignInModal="showSignIn = false" v-if="showSignIn"></signIn>
    <register v-on:showSignInForm="showSignIn = true" v-on:closeRegisterModal="showRegister = false" v-if="showRegister"></register>
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
        showSignIn: false,
        showRegister: false
      }
    },
    methods: {
      launchSignIn() {
        this.showSignIn = true
      },
      launchRegister() {
        this.showRegister = true
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
  .welcome {
    background-position: center;
    background-image: url('../assets/images/beat-locker-splash-bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100%;
  }

  .welcome-message {
    max-width: 600px;
  }

  .welcome-area {
    height: 90vh;
    align-items: center;
    justify-content: center;
  }

  .logo-img {
    width: 70%;
  }

  .tagline-img {
    width: 60%;
  }

  .centerFlex {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .welcome-boxes {
    padding: 1rem;
    margin: 1rem;
    /* outline-color: blueviolet;
    outline-style: dotted;
    outline-width: 1px; */
    align-items: center;
    display: flex;
    justify-content: center;

  }

  .buttons-welcome {
    background-color: rgba(206, 33, 53, 1.0);
    border-color: rgba(180, 26, 44, 1.0);
    transition: all;
    transition-duration: 400ms;
    color: rgba(251, 251, 251, 1.0);
    margin: .5rem;
  }

  .buttons-welcome:hover {
    background-color: rgba(180, 26, 44, 1.0);
    border-color: rgba(150, 16, 33, 1.0); 
  }

  @media (min-width: 576px) {
    .welcome-message {
      width: 75%;

    }
  }
</style>