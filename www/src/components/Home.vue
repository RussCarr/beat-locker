<template>
  <div class="home">
    <navbar></navbar>
    <project></project>
    <sidebar></sidebar>
    <instrumentDrop v-on:inputChange="instSelect"></instrumentDrop>
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
    },
    methods: {
      instSelect(){
        //
      }
    }
  }
</script>

<style scoped>
</style>