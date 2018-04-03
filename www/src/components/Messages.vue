<template>
  <div class="messages">
    
    <div class="msg-form text-left mb-3">
      <form @submit.prevent="sendMsg">
        <div class="form-group mb-2">
          <label for="msg-body">Send a message to the community:</label>
          <textarea class="form-control" id="msg-body" rows="3" v-model="msgBody"></textarea>
        </div>
        <div class="d-flex">
          <button type="submit" class="btn btn-sm btn-info px-4 ml-auto mr-1">Send</button>
          <button type="button" class="btn btn-sm btn-secondary px-4 mr-2" @click="msgBody = 'Your message'">Cancel</button>
        </div>
      </form>
    </div>

    <div class="received-msgs text-left">
      <h5>Latest messages:</h5>

      <div class="msg m-3" v-for="message in messages">
        <span class="msg-body d-block">{{message.body}}</span>
        <span class="sender-name pl-3"><small>-- {{message.senderName}}</small></span>
        <span class="sender-id pl-1"><small>({{new Date(message.createdAt)}})</small></span>
      </div>

    </div>
  </div>
</template>

<script>
  import io from 'socket.io-client'
  export default {
    name: 'Messages',
    mounted() {
      console.log('Message.vue has mounted')
      this.$store.dispatch('initSocket', this.$store.state.user)
      this.$store.dispatch('getMessages')
    },
    data() {
      return {
        msgBody: "Your message"
      }
    },
    computed: {
      messages() {
        var msgs = this.$store.state.messages
        // Sort messages from lastest (first) to earliest (last)
        return msgs.sort((msgA, msgB) => msgB.createdAt - msgA.createdAt)
      },
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      // send a socket.io message to the general Beat-Locker community 'room'
      sendMsg() {
        // Trim whitespace
        var body = this.msgBody.trim()
        // Check to make sure user has actually entered a message
        if (body !== "" && body !== "Your message") {
          // Build the message
          var message = {
            senderId: this.user._id,
            senderName: this.user.name,
            body: body,
            createdAt: Date.now()
          }
          // Send the message
          this.$store.dispatch('sendMessage', message)
          // Reset the form
          this.msgBody = "Your message"
        }
      }
    }
  }
</script>

<style>
</style>