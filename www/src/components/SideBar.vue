<template>
  <div class="sidebar">
      <Slideout menu="#menu" side="right" panel="#panel" :toggleSelectors="['.toggle-button']" @on-open="open">
          <nav id="menu">
            <div>Menu</div>
          </nav>
          <main id="panel">
            <header>
              <div>
                <button class="toggle-button"><</button>
                My Tracks
              </div>
            </header>
          </main>
        </Slideout>
        
  </div>
</template>

<script>
  import Slideout from 'vue-slideout'
  export default {
    name: 'Sidebar',
    components: {
      Slideout
    },
    methods: {
      open: function () {
        console.log('slideoutOpen')

      }
    },
   
  }
</script>

<style scoped>
  body {
    width: 100%;
    height: 100%;
    margin: 0;
  }
 .slideout-side-right {
   right:0px
 }
  .slideout-menu {
    position: fixed;
    top: 202px;
    bottom: 0;
    width: 256px;
    height: 100vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    z-index: 0;
    display: none;
    background-color: #1D1F20;
    color: white;
  }
 
  .slideout-menu-left {
    left: 0;
  }
 
  .slideout-menu-right {
    right: 0;
  }
 
  .slideout-panel {
    background-color: #4B5;
    color: white;
    position: relative;
    z-index: 1;
    will-change: transform;
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