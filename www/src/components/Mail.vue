<template>
  <div class="mail ml-5">
    <form id="app">
      <p>Email:</p>

      <input v-model="formData.to" placeholder="to@to.com">
      <!-- <p>Message to: {{ to }}</p> -->
      <input v-model="formData.from" placeholder="from@from.com">
      <!-- <p>Message from: {{ from }}</p> -->
      <input v-model="formData.subject" placeholder="subject">
      <!-- <p>Message is: {{ subject }}</p> -->
      <input v-model="formData.body" placeholder="body">
      <!-- <p>Message is: {{ body }}</p> -->


      <p>
        <button @click="checkForm">Submit</button>
      </p>

    </form>
    <!-- <form action="mailto:someone@example.com" method="post" enctype="text/plain">
      Name:<br>
      <input type="text" name="name"><br>
      E-mail:<br>
      <input type="text" name="mail"><br>
      Comment:<br>
      <input type="text" name="comment" size="50"><br><br>
      <input type="submit" value="Send" @click="checkForm">
      <input type="reset" value="Reset">
      </form> -->

    <!-- const msg = {

          //Simple email address string
          to: 'someone@example.org',
        
          //Email address with name
          to: 'Some One <someone@example.org>',
        
          //Object with name/email
          to: {
            name: 'Some One',
            email: 'someone@example.org',
          },
        
          //Arrays are supported for to, cc and bcc
          to: [
            'someone@example.org',
            'Some One <someone@example.org>',
            {
              name: 'Some One',
              email: 'someone@example.org',
            },
          ],
        }; -->
  </div>
</template>

<script>
  export default {
    name: 'Mail',
    components: {


    },
    data() {
      return {
        formData: {
        to: "",
        from: "",
        subject: "",
        body: "",
      }
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
  }
</style>