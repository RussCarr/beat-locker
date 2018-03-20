<template>
  <div class="home">
    <navbar></navbar>
    <project></project>
    <sidebar></sidebar>
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
    overflow-x: hidden;
    z-index: 2;
  }

  .footerBottom {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;

  }

</style>
