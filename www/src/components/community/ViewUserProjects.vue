<template>
  <div class="container myBeats">
    <div class="row">
     <div class="col-1">
        <div class="">
            <button @click='loadProject(project)' class="btn btn-sm btn-info"><i class="fas fa-play"></i></button>
        </div>
      </div>
      <div class="col-9">
        <h5 @click="showStats = showStats ? false : true" class="project-title btn-sm btn-link text-white text-center"><i class="fas fa-caret-down"> </i> {{userSharedProject.title}}</h5>
      </div>
      <div class="col-1">
        <!-- <playProject :project="project"></playProject>> -->
        <a href="#" class="text-light mr-5"  @click.prevent="forkProject(userSharedProject)">
            <i class="fas fa-code-branch"></i> 
          </a>
      </div>
    
      <div class="trackStats" v-if="showStats">
          <div class="row">
            <div class="col text-center">
              <p>Plays: {{userSharedProject.playCount}}</p>
            </div>
            <div class="col text-center">
              <p>Forked: {{userSharedProject.forkCount}}</p>
            </div>
            <div class="col text-center">
              <p>Shared: {{userSharedProject.shareCount}}</p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <p class="">Project Description:</p>
              <p class="text-center">{{userSharedProject.description}}</p>
            </div>
          </div>
        </div>
  </div>
  </div>
</template>

<script>
  
  // import PlayProject from './PlayProject'
  export default {
    name: 'ViewUserProjects',
    components: {
      // playProject: PlayProject
         },
    props: ['userSharedProject'],
    data() {
      return {
     showStats:false
      }
    },
    computed: {
       
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
          this.$store.dispatch('loadProject', project)
        })
      },
      showTrackStats() {
        this.showStats = true
      },
      forkProject(sharedProject) {
        console.log('fork project', sharedProject)
        this.$store.dispatch('cloneProject', sharedProject)
      },
    }
  }
</script>

<style>
 .project-title:hover{
   cursor: pointer;
 }
 

  .trackTitle {
    font-size: 20px;
    color: #fbfbfb
  }
  .trackStats{
    background-color: rgba(229, 140, 148, 1.0);
    margin-bottom: 10px;
  }
  .trackDrop {
    background-color: rgba(229, 140, 148, 1.0);
  }
</style> 