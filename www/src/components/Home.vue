<template>
  <div class="container-fluid home">
    <navbar></navbar>
    <div class="row">
      <div class="col">

        <div class="col-sm-11">
          <project></project>
        </div>
      </div>
      <div class="col-sm-1">
          <sidebar></sidebar>
      </div>
    </div>
    <div class="row">
      <p>Footer</p>
    </div>
  </div>

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
  .home {
    overflow-y: hidden;
  }
</style>