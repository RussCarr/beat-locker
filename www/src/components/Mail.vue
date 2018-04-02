<template>
  <div class="mail">
    <form>
      <!-- <p>Email:</p> -->
      <p class="left">To:</p>
      <input class="w-5" v-model="formData.to" placeholder="to@to.com">
      <!-- <p>Message to: {{ to }}</p> -->
      <p class="left">From:</p>
      <input v-model="formData.from" placeholder="from@from.com">
      <!-- <p>Message from: {{ from }}</p> -->
      <p class="left">Subject:</p>
      <input v-model="formData.subject" placeholder="subject" disabled>
      <!-- <p>Message is: {{ subject }}</p> -->
      <!-- <p class="left">Link is attached.</p> -->
      <!-- <input v-model="http://beatlocker.herokuapp.com/project/:projectId" placeholder="body"> -->
      <!-- <input :value='formData.body' > -->
      <!-- <p>Message is: {{ body }}</p> -->

<hr>
      <p>
        <button @click="checkForm">Send</button>
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
          // body:"this is random text",
          body: this.sharedProject._id
        }
      }
    },
    mounted() {
      project: {
        var projectId = ""
          projectId = "" + 
          console.log('Here',projectId)
          this.$store.commit('updateTempProject', projectId)
        
      }
    },

    methods: {
      checkForm() {
        // var formData = {}
        // formData.push(this.to)
        // formData.push(this.from)
        // formData.push(this.subject)
        // formData.push(this.body)
        console.log('mail', this.formData)

        this.$store.dispatch('sendMail', this.formData)
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