<template>
  <div class="home">
    <navbar></navbar>
    <project></project>
    <!-- <sidebar></sidebar> -->

  </div>
</template>

<script>
  import Navbar from './Navbar'
  import SideBar from './SideBar'
  import Project from './project-view/Project'
  export default {
    name: 'Home',
    components: {
      navbar: Navbar,
      project: Project,
      sidebar: SideBar,

    },
    data() {
      return {

      }
    },
    methods: {
      instSelect() {
        //
      }
    }
  }

</script>

<style scoped>


</style>
