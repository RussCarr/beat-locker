<template>
  <div class="drop-panel container-fluid text-light">
    <div class="row px-4 py-4">
      <div class="col-12 col-sm-6 myBeatsRoll">
        
          <myBeatsMenu></myBeatsMenu>
        
      </div>
      <div class="col-12 col-sm-6 messageRoll">
        <messages class="mt-1 text-center"></messages>
      </div>
    </div>
  </div>
</template>

<script>
  import MyBeatsMenu from './profile/MyBeatsMenu'
  import Messages from './Messages'
  export default {
    name: 'MyBeatsDrop',
    components: {
      myBeatsMenu: MyBeatsMenu,
      messages: Messages
    },
    data() {
      return {

      }
    },
    computed: {

    },
    methods: {
      close() {
        this.$emit('closeMyBeatsDrop')
      }
    },

  }
</script>

<style scoped>
  .messageRoll {
    /* position: fixed;  */
    overflow-y: scroll;
    height: 430px;
  }

  .myBeatsRoll {
    /* position: fixed;  */
    overflow-y: scroll;
    overflow-x: hidden;
    height: 430px;
  }

  body {
    width: 100%;
    height: 100%;
    margin: 0;
overflow: hidden;
  }

  .drop-panel {
    position: relative;
    background-color: #6b202d;
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    height: 1.5rem;
  }
</style>