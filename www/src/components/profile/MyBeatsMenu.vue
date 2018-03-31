<template>
  <div class="myBeatsMenu">
    <div class="row">
      <div class="col header">
        <h2>My Beats</h2>
      </div>
    </div>
    <myBeats :project='project' v-for='project in projects' :key='project._id'></myBeats>
  </div>
</template>

<script>
  import MyBeats from './MyBeats'
  export default {
    name: 'MyBeatsMenu',
    components: {
      myBeats: MyBeats,
    },
    data() {
      return {
     
      }
    },
    computed: {
      projects() {
        return this.$store.state.userProjects
      },
      updateProjects(){
        return this.$store.dispatch('getUserProjects',project.userId)
        
      },
     
    },
    methods: {
      getProject() {
        this.$store.dispatch()
      }
    }
  }

</script>

<style>
</style>