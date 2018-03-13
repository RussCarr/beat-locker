<template>
  <div class="sidebar">
    <div class="row">
      <div class="col">

        <div class="col-sm-11">

        </div>
        <div class="col-sm-1  d-flex">
          <h6 @click="openSideBar" @OpenSideBar="openSideBar" class="sideBarLayout">MyProjects</h6>

        </div>
      </div>
    </div>
    <div v-if="showSideBar" class="bar">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                header
              </div>

              <div class="modal-body">
                body
              </div>

              <div class="modal-footer">
                <div name="footer">
                  default footer
                  <button class="modal-default-button" @click="close">
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Sidebar',

    data() {
      return {
        showSideBar: false

      }

    },
    methods: {
      close() {
        this.showSideBar = false
      },
      openSideBar() {
        this.showSideBar = true
      },
    },
  }
</script>

<style scoped>
  .sidebar {
    display: flex
  }

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  /*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  .tabs-right {
    border-left: 1px solid #ddd;
  }

  .tabs-right>li {
    margin-left: -1px;
  }

  .tabs-right>li.active>a,
  .tabs-right>li.active>a:hover,
  .tabs-right>li.active>a:focus {
    border-bottom: 1px solid #ddd;
    border-left-color: transparent;
  }

  .tabs-right>li>a {
    border-radius: 0 4px 4px 0;
    margin-right: 0;
  }

  .tabs-left,
  .tabs-right {
    border-bottom: none;
    padding-top: 2px;
  }

  sideBarLayout {
   border: 2px solid black;
  }
</style>