<template>
  <div class="project-showspace">

    <div class="top-bar">

      <div class="bg-img d-flex align-items-center justify-content-center pt-3 pb-2 px-4" @click="home">
        <div class="text-center">
          <img class="logo" src="../assets/images/beat-locker-logo-large-white.png">
          <h6 class="text-light">Like this project? Click here to try Beat-Locker yourself!</h6>
        </div>
      </div>

    </div>

    <div class="container-fluid text-center mt-2 pb-5">

      <div class="project-header pt-3 mb-4 text-center">

        <h1 class="project-title h3 text-light">{{projectTitle}}</h1>

      </div>

      <div class="project pl-2">

        <div class="board p-1">
          <step-track v-for="stepTrack in stepTracks" :key="stepTrack._id" :stepTrack="stepTrack" v-on:muteTrack="toggleMute(stepTrack)"
            v-on:soloTrack="toggleSolo(stepTrack)" v-on:stopPlayback="stopPlayer = true" v-on:deleteTrack="deleteTrack(stepTrack)"></step-track>
        </div>

      </div>

      <div class="row">

        <div class="col-4 mt-4 pr-5">
          <button class="btn btn-sm btn-outline-light mr-2" @click="createBeatTrack">
            <i class="fas fa-plus-circle"></i> Add beat track
          </button>
        </div>

        <div class="bottom-controls col-7 pl-4 pr-4">
          <div class="controls mt-4">

            <player :project="project" :tracksFromParent="stepTracks" :largeButtons="true" :stopPlayer="stopPlayer" v-on:resetStopPlayer="stopPlayer = false"></player>

          </div>

          <div class="bpm-slider-container mt-3 text-center">
            <input type="range" min=40 max="214" v-model="newBpmSetting" class="bpm-slider" @change="bpmChange">
            <span class="bpm d-inline-block text-light mt-1">
              <small>BPM: {{newBpmSetting}}</small>
            </span>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import Tone from 'tone'
  import Player from './Player'
  import StepTrack from './home/StepTrack'
  export default {
    name: 'ProjectShowspace',
    components: {
      'step-track': StepTrack,
      'player': Player
    },
    data() {
      return {
        newBpmSetting: "",
        stopPlayer: false,
        project: {},
        stepTracks: [],
        projectTitle: ""
      }
    },
    mounted() {
      this.$store.dispatch('loadProject', this.$route.params.projectId).then(() => {
        this.project = this.$store.state.activeProject

        this.projectTitle = this.$store.state.activeProject.title

        var tracks = this.$store.state.activeTracks

        var noteTracks = tracks.filter(track => track.isNote)
        // Sort the note tracks from first-created (at top) to last-created (at bottom)
        var sortedNoteTracks = noteTracks.sort((trackA, trackB) => {
          return trackA.createdAt - trackB.createdAt
        })

        var beatTracks = tracks.filter(track => !track.isNote)
        // Sort the beat tracks from first-created (at top) to last-created (at bottom)
        var sortedBeatTracks = beatTracks.sort((trackA, trackB) => {
          return trackA.createdAt - trackB.createdAt
        })

        this.stepTracks = noteTracks.concat(beatTracks)
      })

      getBpmSetting(this) // Wait briefly to make sure 'activeProject' has a defined value...
        .then(setting => { // ...then assign 'newBpmSetting'
          this.newBpmSetting = setting
        })

      function getBpmSetting(ctx) {
        return new Promise((resolve, reject) => {
          waitForData(ctx)

          function waitForData(ctx) {
            setTimeout(() => {
              if (ctx.$store.state.activeProject.bpmSetting) {
                resolve(ctx.$store.state.activeProject.bpmSetting)
              } else {
                waitForData(ctx)
              }
            }, 50)
          }
        })
      }
    },
    computed: {
      projectIsPlaying() {
        return this.$store.state.playingProjectId !== ""
      }
    },
    methods: {
      home() {
        this.$router.push({ path: '/home' })
      },
      toggleMute(track) {
        track.muted = track.muted ? false : true
      },
      toggleSolo(track) {
        if (track.solo) { // If removing 'solo' from a track...
          track.solo = false
          this.stepTracks.forEach(stepTrack => {
            if (stepTrack._id !== track._id) {
              stepTrack.muted = false // ... unmute all other tracks
            }
          })
        } else { // If engaging 'solo' on a track...
          track.solo = true
          this.stepTracks.forEach(stepTrack => {
            if (stepTrack._id !== track._id) {
              stepTrack.muted = true // ... mute all other tracks
            }
          })
        }
      },
      bpmChange() {
        if (this.projectIsPlaying) {
          this.stopPlayer = true
        }
        var setting = Number(this.newBpmSetting)
        var updatedProject = {
          '_id': this.project._id,
          bpmSetting: setting
        }
        this.$store.dispatch('updateProject', updatedProject)
      },
      createBeatTrack() {
        if (this.projectIsPlaying) {
          this.stopPlayer = true
        }
        this.$store.dispatch('createBeatTrack', this.project)
      },
      // createNoteTrack() {
      //   if (this.projectIsPlaying) {
      //     this.stopPlayer = true
      //   }
      //   this.$store.dispatch('createNoteTrack', this.project)
      // },
      deleteTrack(track) {
        var data = {
          project: this.project,
          deleting: track
        }
        this.$store.dispatch('deleteTrack', data)
      }
    }
  }

</script>

<style scoped>
  .project-showspace {
    background-color: #372529;
    margin-top: -0.5rem;
    min-height: 101vh;
  }

  select.form-control.steps-per-bar,
  select.form-control.bar-count {
    height: 1.5rem !important;
  }

  .playStopButtons {
    background: none;
    border: none;
    color: white;
  }

  .playStopButtons:hover {
    cursor: pointer;
    background: none;
    border: none;
    color: rgba(206, 33, 53, 1.0);
  }

  .playStopButtons:focus {
    outline: 0;
  }

  .bpm-slider-container {
    width: 100%;
  }

  .bpm-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    background: #fff;
    outline: none;
    opacity: 0.7;
    transition: opacity .2s;
  }

  .bpm-slider:hover {
    opacity: 1;
  }

  .bpm-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: rgba(206, 33, 53, 1.0);
    border-radius: 50%;
    cursor: pointer;
  }

  .bpm-slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: rgba(206, 33, 53, 1.0);
    border-radius: 50%;
    cursor: pointer;
  }

  .bg-img {
    background-position: top;
    background-image: url('../assets/images/beat-locker-splash-bg.jpg');
    background-repeat: no-repeat;
  }

  .logo {
    width: 90%;
    max-width: 500px;
  }

  .top-bar:hover {
    cursor: pointer;
  }
</style>
