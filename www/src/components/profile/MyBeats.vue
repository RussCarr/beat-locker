<template>
  <div class="container myBeats">
    <div class="row">
      <div class="col-2">
        <div class="">
          <label class="switch">
            <input type="checkbox" v-model="shared">
            <span class="slider round"></span>
          </label>
          <p class="text-center">
            <span v-if="!shared">Private</span>
            <span v-if="shared">Shared</span>
          </p>
        </div>
      </div>
      <player class="ml-3" :project="project"></player>
      <div class="col-5">
        <h5 @click="showStats = showStats ? false : true" class="project-title btn-sm btn-link text-white text-center"><i class="fas fa-caret-down"> </i> {{project.title}}</h5>
      </div>
      <div class="col-2">
          
        <button @click='loadProject(project)' class="btn btn-sm btn-info ">load</button>
      </div>
      <div class="col-1 px-0">
        <button @click='deleteProject(project)' :disabled="disable" class="btn btn-sm btn-danger ml-2"><i class="far fa-trash-alt"></i></button>
      </div>
    </div>
    <div class="trackStats" v-if="showStats">
      <div class="row">
        <div class="col text-center">
          <p>Plays: {{project.playCount}}</p>
        </div>
        <div class="col text-center">
          <p>Forked: {{project.forkCount}}</p>
        </div>
        <div class="col text-center">
          <p>Shared: {{project.shareCount}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p class="">Project Description:</p>
          <p class="text-center">{{project.description}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Player from '../Player'
  export default {
    name: 'Mybeats',
    components: {
      player: Player
    },
    props: ['project'],
    data() {
      return {
        showStats: false,
        shared: this.project.shared,
        // btnDisable: false
      }
    },
    computed: {
      disable() {
        return this.$store.state.userProjects.length === 1
      },
      beatTracks() {
        return this.$store.state.previewTracks
      },
    },
    watch: {
      shared: function (shared) {
        // console.log('adsf',shared,this.project)
        var payload = [this.project]
        if (shared == true) {
          var newStatus = true
          // var sharedProject = payload.private
          payload.push(newStatus)
          // console.log(payload,"payload shared")
          this.$store.dispatch('getProjectShared', payload)
        } else {
          var newStatus = false
          // var NotSharedProject = payload.private
          payload.push(newStatus)
          // console.log(payload,"payload private")
          this.$store.dispatch('getProjectShared', payload)
        }
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
          this.$store.dispatch('loadProject', project)
        })
      },
      showTrackStats() {
        this.showStats = true
      },
      deleteProject(project) {
        this.$store.dispatch('deleteProject', project)
      }
    }
  }
</script>

<style>
 .project-title:hover{
   cursor: pointer;
 }
 
 
  .mybeats {
    display: flex;
  }

  .header {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    align-self: center;

  }

  .switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 22px;
  }

  /* Hide default HTML checkbox */

  .switch input {
    display: none;
  }

  /* The slider */

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 15px;
    width: 15px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked+.slider {
    background-color: #2196F3;
  }

  input:focus+.slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked+.slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
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