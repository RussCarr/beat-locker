<template>
  <div class="container-fluid myBeats">
    <div class="row shared-track">

      <div class="col-sm-2">
        <div class="row">
          <div class="col-6 icons">
            <player :project="userSharedProject" :largeButtons="false" :allowPlayCountUpdate="false"></player>
          </div>
          <div class="col-6 icons">
            <a href="#" class="text-light" @click.prevent="forkProject(userSharedProject)">
              <i class="fas fa-code-branch"></i>
            </a>
          </div>
        </div>

      </div>
      <div class="col-sm-10">
        <h5 @click="showStats = showStats ? false : true" class="project-title btn-sm btn-link text-white text-center">
          <i class="fas fa-caret-down"> </i> {{userSharedProject.title}}</h5>
      </div>

      <div class="trackStats" v-if="showStats">
        <div class="row">
          <div class="col-sm-4 text-center">
            <p>Plays: {{userSharedProject.playCount}}</p>
          </div>
          <div class="col-sm-4 text-center">
            <p>Forked: {{userSharedProject.forkCount}}</p>
          </div>
          <div class="col-sm-4 text-center">
            <p>Shared: {{userSharedProject.shareCount}}</p>
          </div>
          <div class="col-sm-12">
            <p class="">Project Description:</p>
            <p class="text-center">{{userSharedProject.description}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>  
  import Player from './../Player'
  export default {
    name: 'ViewUserProjects',
    components: {
      player: Player
    },
    props: ['userSharedProject'],
    data() {
      return {
        showStats: false
      }
    },
    methods: {
      loadProject(project) {
        // First, save the current project.
        var data = {
          project: this.$store.state.activeProject,
          tracks: this.$store.state.activeTracks
        }
        this.$store.dispatch('saveProject', data).then(() => {
          // Then, load the selected project.
          this.$store.dispatch('loadProject', project._id)
        })
      },
      showTrackStats() {
        this.showStats = true
      },
      forkProject(sharedProject) {
        console.log('fork project', sharedProject)
        this.$store.dispatch('cloneProject', sharedProject)
      }
    }
  }
</script>

<style>
  /* div {
    outline-style: solid;
    outline-color: rgb(235, 135, 213);
    outline-width: 1px;
  } */

  .project-title:hover {
    cursor: pointer;
  }

  .shared-track {
    margin: .5rem;
    border-bottom-color: white;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    
  }

  .icons {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .trackTitle {
    font-size: 20px;
    color: #fbfbfb
  }

  .trackStats {
    background-color: rgba(107, 32, 45, .6);
    margin: .5rem;
    padding: .5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .trackDrop {
    background-color: rgba(107, 32, 45, 1.0);
  }
</style>