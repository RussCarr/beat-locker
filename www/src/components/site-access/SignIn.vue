<template>
  <div class="background">
    <div class="signIn">
        <form class="p-4" @submit.prevent="submit">
            <div class="form-group">
              <label class="ml-4" for="email">Email:</label>
              <input type="text" id="email" class="form-control" v-model="user.email" placeholder="my@address.com">
            </div>
            <div class="form-group">
              <label class="ml-4" for="password">Password:</label>
              <input type="password" id="password" class="form-control" v-model="user.password" placeholder="********">
            </div>
            <button class="btn btn-success signInButton px-4" type="submit">Sign in</button>
            <button class="btn btn-secondary px-4" @click="closeModal">Close</button>
            <div class="text-center pt-4">
              <a href="#" class="text-muted" @click.prevent="showRegisterForm">Click here to register.</a>
            </div>
          </form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'SignIn',
    data() {
      return {
        user: {
          password: '',
          email: ''
        },
      }
    },
    methods: {
      submit() {
        this.$store.dispatch('loginUser', this.user)
      },
      showRegisterForm() {
        this.$emit('showRegisterForm')
        this.$emit('closeSignInModal')
      },
      closeModal() {
        this.$emit('closeSignInModal')
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

  .signIn {
    width: 95%;
    background-position: center;
    background-image: url('../../assets/images/beat-locker-splash-bg.jpg');
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-radius: 4px; 
  }

  @media (min-width: 576px) {
    div.signIn {
      width: 50%;
    }
  }

  form {
    background-color: rgba(55, 37, 41, .8);
    color: rgba(251, 251, 251, 1.0);
  }

  .signInButton {
    background-color: rgba(57, 123, 172, 1.0);
    border-color: rgba(33, 92, 136, 1.0);
    transition: all;
    transition-duration: 400ms; 
  }

  .signInButton:hover {
    background-color: rgba(33, 92, 136, 1.0);
    border-color: rgba(33, 92, 136, 1.0);
  }

  .button {
    display: flex;
    justify-content: flex-end;
    align-self: center;
  }
</style>