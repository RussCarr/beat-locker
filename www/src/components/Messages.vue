<template>
  <div class="messages">
    
    <div class="msg-form text-left">
      <form @submit.prevent="sendMsg">
        <div class="form-group">
          <label for="msg-body">Send a new message:</label>
          <textarea class="form-control" id="msg-body" rows="3" v-model="msgBody"></textarea>
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
      }
    },
    methods: {
      sendMsg() {
        // send a socket.io msg to the general 'room'
      }
    }
  }
</script>

<style>
</style>