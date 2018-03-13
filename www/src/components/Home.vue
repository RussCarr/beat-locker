<template>
  <div class="home">
    <navbar></navbar>
    <project></project>
  </div>
</template>

<script>
  import Navbar from './Navbar'
  import Project from './project-view/Project'
  export default {
    name: 'Home',
    components: {
      navbar: Navbar,
      project: Project,
    },
    data() {
      return {

      }
    }

  }
</script>

<style scoped>
</style>