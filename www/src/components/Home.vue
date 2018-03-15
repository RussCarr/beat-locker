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
    </div>
    <bottom class="footerBottom"></bottom>
  </div>
</template>

<script>
  import Navbar from './Navbar'
  import SideBar from './SideBar'
  import Project from './project-view/Project'
  import Bottom from './Bottom'
  export default {
    name: 'Home',
    components: {
      navbar: Navbar,
      project: Project,
      sidebar: SideBar,
      bottom: Bottom,
    },
    data() {
      return {
        // activeUser: {
        //   userId: this.$store.user._id
        // }
      }
    },
    props: [
      'activeUser'
    ],
    computed: {
      // activeUser() {
      //   return this.$store.state.user._id
      // },
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

  .footerBottom {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;

  }
</style>