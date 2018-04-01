<template>
  <div class="messages">
    <h1>Messages</h1>
    <div class="row m-3">
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. A molestiae nulla exercitationem cupiditate aspernatur sequi
        alias minus consectetur, architecto vel animi ea minima expedita soluta possimus magnam nemo, numquam cumque.</p>
      <h6 class="text-center">-John Dow</h6>
    </div>
    <div class="row m-3">
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. A molestiae nulla exercitationem cupiditate aspernatur sequi
        alias minus consectetur, architecto vel animi ea minima expedita soluta possimus magnam nemo, numquam cumque.</p>
      <h6 class="text-center">-John Dow</h6>
    </div>
    <div class="row m-3">
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. A molestiae nulla exercitationem cupiditate aspernatur sequi
        alias minus consectetur, architecto vel animi ea minima expedita soluta possimus magnam nemo, numquam cumque.</p>
      <h6 class="text-center">-John Dow</h6>
    </div>
    <div class="row m-3">
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. A molestiae nulla exercitationem cupiditate aspernatur sequi
        alias minus consectetur, architecto vel animi ea minima expedita soluta possimus magnam nemo, numquam cumque.</p>
      <h6 class="text-center">-John Dow</h6>
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
    }
  }
</script>

<style>
</style>