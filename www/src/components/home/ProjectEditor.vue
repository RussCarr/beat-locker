<template>
  <div class="container-fluid text-center mt-2 mb-5">

    <div class="project-header row my-4 text-left">

      <div class="col-4 pl-0 d-flex flex-column justify-content-between">
        <div>
          <button class="save btn btn-sm btn-outline-light px-4 pb-2 ml-5" @click="saveProject">
            <i class="far fa-save"></i> Save project
          </button>
        </div>

        <div class="text-center">
          <button class="btn btn-sm btn-outline-light mr-2" @click="createNoteTrack">
            <i class="fas fa-plus-circle"></i> Add note track
          </button>
        </div>
      </div>

      <div class="col-8 pl-4">
        
        <div class="ml-2">
          <div v-if="!showTitleEdit">
            <span class="project-title h5 text-light">Name: {{projectTitle}}</span>
            <a href="#" class="title-edit-toggle text-light ml-3" @click="showTitleEdit = true">
              <i class="fas fa-pencil-alt"></i>
            </a>
          </div>
          <div v-if="showTitleEdit" class="d-flex align-content-center">
            <input type="text" class="form-control w-50 d-inline-block" v-model="projectTitle">
            <button class="save-project btn ml-2 px-4 text-white" @click="updateTitle">save</button>
            <button class="cancel btn btn-secondary ml-2 px-4 text-white" @click="cancelTitleEdit">cancel</button>
          </div>
        </div>

        <div class="project-options d-flex text-white mt-2 ml-2">
          
          <form class="form-inline">
            <div class="form-group mr-3">
              <label class="mr-2" for="steps-per-bar">steps per bar:</label>
              <select class="steps-per-bar form-control py-0" id="steps-per-bar" v-model="stepsPerBar" @change="changeStepsPerBar">
                <option>3</option>
                <option selected>4</option>
              </select>
            </div>
            <div class="form-group">
              <label class="mr-2" for="bar-count">total bars:</label>
              <select class="bar-count form-control py-0" id="bar-count" v-model="barCount" @change="changeBarCount">
                <option>2</option>
                <option>3</option>
                <option selected>4</option>
                <option>5</option>
                <option>6</option>
              </select>
            </div>
          </form>

        </div>

      </div>
      
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

          <player :project="project" :tracksFromParent="stepTracks" :largeButtons="true" :stopPlayer="stopPlayer"
            v-on:resetStopPlayer="stopPlayer = false"></player>

        </div>
  
        <div class="bpm-slider-container mt-3 text-center">
          <input type="range" min=40 max="214" v-model="newBpmSetting" class="bpm-slider" @change="bpmChange">
          <span class="bpm d-inline-block text-light mt-1"><small>BPM: {{newBpmSetting}}</small></span>
        </div>
        
      </div>

    </div>    

  </div>
</template>

<script>
  import Tone from 'tone'
  import Player from './../Player'
  import StepTrack from './StepTrack'
  export default {
    name: 'ProjectEditor',
    components: {
      'step-track': StepTrack,
      'player': Player
    },
    data() {
      return {
        showTitleEdit: false,
        updatedTitle: "",
        updatedStepsPerBar: "",
        updatedBarCount: "",
        newBpmSetting: "",
        stopPlayer: false
      }
    },
    mounted() {
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
              }
              else {
                waitForData(ctx)
              }
            }, 50)
          }
        })
      }
    },
    computed: {
      project() {
        return this.$store.state.activeProject
      },
      stepTracks() {
        // Get all the tracks
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

        return noteTracks.concat(beatTracks)
      },
      projectTitle: {
        get() {
          return this.$store.state.activeProject.title
        },
        set(value) {
          var MaxCharCount = 52          
          if (value.length > MaxCharCount) {
            value = value.slice(0, MaxCharCount) + "..."
          }
          this.updatedTitle = value
        }
      },
      stepsPerBar: {
        get() {
          return this.$store.state.activeProject.stepsPerBar
        },
        set(value) {
          this.updatedStepsPerBar = value
        }
      },
      barCount: {
        get() {
          return this.$store.state.activeProject.barCount
        },
        set(value) {
          this.updatedBarCount = value
        }
      },
      projectIsPlaying() {
        return this.$store.state.playingProjectId !== ""
      }
    },
    methods: {
      saveProject() {
        if (this.projectIsPlaying) {
          this.stopPlayer = true
        }
        var data = {
          project: this.project,
          tracks: this.stepTracks
        }
        this.$store.dispatch('saveProject', data)
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
      updateTitle() {
        var updatedProject = {
          '_id': this.project._id,
          title: this.updatedTitle
        }
        this.$store.dispatch('updateProject', updatedProject)
        this.showTitleEdit = false
      },
      cancelTitleEdit() {
        this.updatedTitle = this.$store.state.activeProject.title
        this.showTitleEdit = false
      },
      changeStepsPerBar() {
        if (this.projectIsPlaying) {
          this.stopPlayer = true
        }

        var updatedProject = {
          '_id': this.project._id,
          stepsPerBar: this.updatedStepsPerBar
        }
        this.$store.dispatch('updateProject', updatedProject)

        var tracks = this.$store.state.activeTracks
        tracks.forEach(track => {
          var newStepSequence = track.stepSequence
          if (track.stepsPerBar > this.updatedStepsPerBar) { // If changing from 4 bars at 4 steps-per-bar to 4 bars at 3 steps-per-bar...
            newStepSequence = track.stepSequence.slice(0, 12) // ...remove steps 12-15 (i.e. the last four)
          } else if (track.stepsPerBar < this.updatedStepsPerBar) { // If changing from 4 bars at 3 steps-per-bar to 4 bars at 4 steps-per-bar...
            newStepSequence = track.stepSequence.concat([false, false, false, false]) // ...add steps 12-15 (i.e. four new steps)
          }
          var updatedTrack = {
            '_id': track._id,
            stepsPerBar: this.updatedStepsPerBar,
            stepSequence: newStepSequence
          }
          this.$store.dispatch('updateTrack', updatedTrack)
        })
      },
      changeBarCount() {
        if (this.projectIsPlaying) {
          this.stopPlayer = true
        }

        var updatedProject = {
          '_id': this.project._id,
          barCount: this.updatedBarCount
        }
        this.$store.dispatch('updateProject', updatedProject)

        var tracks = this.$store.state.activeTracks
        tracks.forEach(track => {
          var newStepSequence = track.stepSequence
          if (track.barCount > this.updatedBarCount) { // If removing bars...
            var removedSteps = (track.barCount - this.updatedBarCount) * track.stepsPerBar
            newStepSequence = track.stepSequence.slice(0, track.stepSequence.length - removedSteps)
          } else if (track.barCount < this.updatedBarCount) { // If adding bars...
            var addedSteps = (this.updatedBarCount - track.barCount) * track.stepsPerBar
            newStepSequence = track.stepSequence.concat(new Array(addedSteps).fill(false))
          }
          var updatedTrack = {
            '_id': track._id,
            barCount: this.updatedBarCount,
            stepSequence: newStepSequence
          }
          this.$store.dispatch('updateTrack', updatedTrack)
        })
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
      createNoteTrack() {
        if (this.projectIsPlaying) {
          this.stopPlayer = true
        }
        this.$store.dispatch('createNoteTrack', this.project)
      },
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

<style>
  body{
    background-color: #372529;
  }

  .project-header {
    height: 8rem;
  }

  .save-project {
    background-color: rgba(57, 123, 172, 1.0);
  }

  .save-project:hover {
    background-color: rgba(33, 92, 136, 1.0);
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

</style>
