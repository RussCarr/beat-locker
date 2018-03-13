<template>
  <div class="home">
    <navbar></navbar>
    <project></project>
    <sidebar></sidebar>
    <instrumentDrop></instrumentDrop>
  </div>
</template>

<script>
  import Navbar from './Navbar'
  import SideBar from './SideBar'
  import Project from './project-view/Project'
  import InstrumentDrop from './project-view/InstrumentDrop'
  export default {
    name: 'Home',
    components: {
      navbar: Navbar,
      project: Project,
      sidebar: SideBar,
      instrumentDrop: InstrumentDrop
    },
    data() {
      return {

      }
    }

  }
</script>

<style scoped>
</style>