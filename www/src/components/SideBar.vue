<template>
  <div class="sidebar">
    <slideout menu="#menu" side="right" panel="#panel" :toggleSelectors="['.toggle-button']" @on-open="open">
      <main id="panel">
      </main>
      <header class="header">
          <!-- <button :activeUser='activeUser' @click='getProjects(activeUser)' class="toggle-button"></button> -->
            
        </header>
      <nav id="menu">
        <div class="myBeatsRoll">
          <myBeatsMenu></myBeatsMenu>
        </div>
        <div class="messageRoll">
          <messages class="mt-1 text-center"></messages>
        </div>
      </nav>
    </slideout>

  </div>
</template>

<script>
  import Slideout from 'vue-slideout'
  import MyBeatsMenu from './profile/MyBeatsMenu'
  import Messages from './Messages'
  export default {
    name: 'Sidebar',
    components: {
      slideout: Slideout,
      myBeatsMenu: MyBeatsMenu,
      messages: Messages
    },
    data() {
      return {
        
      }
    },
    // props: [
    //   'activeUser'
    // ],
    computed: {
      activeUser() {
        return this.$store.state.user._id
      },
    },
    methods: {
      open: function () {
        console.log('slideoutOpen')
      },
      
    },

  }
</script>

<style scoped>
.sidebar{
  z-index: 100;
}
  .messageRoll {
    /* position: fixed;  */
    overflow-y: scroll;
    height: 320px;
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

  }

  .slideout-side-right {
    right: 0px
  }

  #panel {
    /* margin-left: 1px; */
    width: 120px;
     }

  .slideout-menu {
    position: fixed;
    top: 181px;
    bottom: 0;
    width: 400px;
    height: 100vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    z-index: 1;
    display: none;
    background-color: #6b202d;
    color: white;
  }

  .slideout-menu-left {
    left: 0;
  }

  .slideout-menu-right {
    right: 0;
  }

  .slideout-panel {
    background-color: #e58c94;
    color: white;
    position: relative;
    z-index: 1;
    /* will-change: transform; */
    max-height: 80vh;
  }

  .slideout-open,
  .slideout-open body,
  .slideout-open .slideout-panel {
    overflow: hidden;
  }

  .slideout-open .slideout-menu {
    display: block;
  }
</style>