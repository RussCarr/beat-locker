<template>
  <div class="mail">
    <form>
      <p class="left">To:</p>
      <input class="w-5 mb-2" v-model="formData.to" placeholder="someone@somewhere.com">
      <!-- <p class="left">From:</p> -->
      <!-- <input v-model="formData.from" placeholder="Who are you?" disabled> -->
      <p class="left mt-1">Message:</p>
      <p class="text-center">{{loggedInUser.name}} created a beat and wants you to listen!</p>
      <!-- <p>BeatMaster@beatlocker.com</p> -->
      <!-- <input v-model="formData.subject" placeholder="subject" disabled> -->
      <hr>
      <p>
        <button @click.prevent="sendClose">Send</button>
      </p>
      </form>

  </div>
</template>

<script>
  export default {
    name: 'Mail',
    components: {


    },
    props: ['sharedProject','loggedInUser'],
    data() {
      return {
        formData: {
          to: "",
          from: this.loggedInUser.email,
          subject: " created a beat and wants you to listen!",
          body: this.sharedProject._id,
          sharedProject: this.sharedProject
        }
      }
    },
     methods: {
      sendClose() {
        // console.log('mail', this.formData)
        this.formData.subject = this.loggedInUser.name + this.formData.subject 
        this.$store.dispatch('sendMail', this.formData)
        this.$emit('mailBox')
      },

    }
  }

</script>

<style>
  .mail {
    color: white;
    z-index: -1;
    width: 100px;
  }

  .left {
    display: flex;
    text-justify: left;
  }

  .mail input {
    width: 285px;
  }
</style>