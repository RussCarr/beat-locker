<template>
  <div class="background">
    <div class="signIn container">
      <div class="signInForm text-dark">
        <form class="border border-secondary rounded p-4" @submit.prevent="submit">
          <div class="form-group">
            <label class="ml-4" for="email">Email:</label>
            <input type="text" id="email" class="form-control" v-model="user.email" placeholder="my@address.com">
          </div>
          <div class="form-group">
            <label class="ml-4" for="password">Password:</label>
            <input type="password" id="password" class="form-control" v-model="user.password" placeholder="********">
          </div>
          <button class="btn btn-success px-4" type="submit">Sign in</button>
          <button class="btn btn-success px-4" @click="closeModal">Close</button>
          <div class="text-center pt-4">
            <a href="#" class="text-muted" @click.prevent="showRegisterForm">Click here to register.</a>
          </div>
        </form>
      </div>
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

  div.signIn {
    width: 95%;
  }

  @media (min-width: 576px) {
    div.signIn {
      width: 50%;
    }
  }

  .signInForm {
    padding: 1rem;
  }

  form {
    background-color: #9F202D;

  }

  .button {
    display: flex;
    justify-content: flex-end;
    align-self: center;
  }
</style>