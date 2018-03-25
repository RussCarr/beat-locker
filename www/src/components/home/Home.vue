<template>
  <div class="home">
    <navbar></navbar>
    <project-editor></project-editor>
    <sidebar></sidebar>
    <page-footer></page-footer>
  </div>
</template>

<script>
  import Navbar from '../Navbar'
  import SideBar from '../SideBar'
  import ProjectEditor from './ProjectEditor'
  import PageFooter from '../PageFooter'
  export default {
    name: 'Home',
    components: {
      'navbar': Navbar,
      'project-editor': ProjectEditor,
      'sidebar': SideBar,
      'page-footer': PageFooter,
    }
  }

</script>

<style scoped>
  .home {
    overflow-y: hidden;
    overflow-x: hidden;
    z-index: 2;
  }

  page-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }
</style>
