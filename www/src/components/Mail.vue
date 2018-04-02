<template>
  <div class="mail">
    <form>
      <p class="left">To:</p>
      <input class="w-5" v-model="formData.to" placeholder="to@to.com">
      <p class="left">From:</p>
      <input v-model="formData.from" placeholder="from@from.com">
      <p class="left">Subject:</p>
      <input v-model="formData.subject" placeholder="subject" disabled>
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
    props: ['sharedProject'],
    data() {
      return {
        formData: {
          to: "",
          from: "",
          subject: "Check out this New Beat I created.",
          body: this.sharedProject._id
        }
      }
    },
     methods: {
      sendClose() {
        console.log('mail', this.formData)
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