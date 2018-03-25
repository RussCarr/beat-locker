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
        <beatTrack v-for="beatTrack in beatTracks" :key="beatTrack._id" :beatTrack="beatTrack" v-on:muteTrack="toggleMute(beatTrack)"
          v-on:soloTrack="toggleSolo(beatTrack)" v-on:stopPlayback="stopPlayer = true" v-on:deleteTrack="deleteTrack(beatTrack)"></beatTrack>
        <!-- <beatTrack v-for="beatTrack in beatTracks" :key="beatTrack._id" :beatTrack="beatTrack" v-on:muteTrack="toggleMute(beatTrack)"
          v-on:soloTrack="toggleSolo(beatTrack)" v-on:deleteTrack="deleteTrack(beatTrack)"></beatTrack> -->
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

          <player :project="project" :tracksFromParent="beatTracks" :largeButtons="true" :stopPlayer="stopPlayer" v-on:resetStopPlayer="stopPlayer = false"></player>

        </div>
  
        <div class="bpm-slider-container mt-3 text-center">
          <input type="range" min=40 max="214" v-model="bpmSetting" class="bpm-slider" @change="bpmChange">
          <span class="bpm d-inline-block text-light mt-1"><small>BPM: {{bpmSetting}}</small></span>
        </div>
        
      </div>

    </div>
    

  </div>
</template>

<script>

  // 1. Need to be able to trigger 'stop' method on Player FROM the parent component (e.g. for when editor controls change for saveProject,
  // changeStepsPerBar, etc.)
  // 2. Need to have the option to pass tracks IN to the Player as a prop, and Player needs to be able to either load tracks from a prop OR
  // from its own set-and-get previewTracks setup if none ARE passed in... Because for BeatProject, the activeTracks from state need to be used.

  import Tone from 'tone'
  import Player from './../Player'
  import BeatTrack from './BeatTrack'
  export default {
    name: 'BeatProject',
    components: {
      beatTrack: BeatTrack,
      player: Player
    },
    data() {
      return {
        showTitleEdit: false,
        updatedTitle: "",
        updatedStepsPerBar: "",
        updatedBarCount: "",
        bpmSetting: 120,
        stopPlayer: false
      }
    },
    computed: {
      project() {
        return this.$store.state.activeProject
      },
      beatTracks() {
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

        // console.log('note tracks', noteTracks)
        // console.log('beat tracks', beatTracks)
        // console.log('sorted tracks', noteTracks.concat(beatTracks))

        return noteTracks.concat(beatTracks)
      },
      projectTitle: {
        get() {
          return this.$store.state.activeProject.title
        },
        set(value) {
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
      bpmStoredSetting: {
        get() {
          return this.$store.state.activeProject.bpmSetting
        },
        set(value) {
          this.bpmSetting = value
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
        // if (this.isPlaying) {
        //   this.loop.stop()
        //   this.isPlaying = false
        // }
        var data = {
          project: this.project,
          tracks: this.beatTracks
        }
        this.$store.dispatch('saveProject', data)
      },
      toggleMute(track) {
        track.muted = track.muted ? false : true
      },
      toggleSolo(track) {
        if (track.solo) { // If removing 'solo' from a track...
          track.solo = false
          this.beatTracks.forEach(beatTrack => {
            if (beatTrack._id !== track._id) {
              beatTrack.muted = false // ... unmute all other tracks
            }
          })
        } else { // If engaging 'solo' on a track...
          track.solo = true
          this.beatTracks.forEach(beatTrack => {
            if (beatTrack._id !== track._id) {
              beatTrack.muted = true // ... mute all other tracks
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
        // if (this.isPlaying) {
        //   this.loop.stop()
        //   this.isPlaying = false
        // }

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
        // if (this.isPlaying) {
        //   this.loop.stop()
        //   this.isPlaying = false
        // }

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
        // if (this.isPlaying) { // Stop play-back if the BPM setting changes
        //   this.loop.stop()
        //   this.isPlaying = false
        // }
        var value = Number(this.bpmSetting)
        var updatedProject = {
          '_id': this.project._id,
          bpmSetting: value
        }
        this.$store.dispatch('updateProject', updatedProject)
      },
      createBeatTrack() {
        if (this.projectIsPlaying) {
          this.stopPlayer = true
        }
        // if (this.isPlaying) {
        //   this.loop.stop()
        //   this.isPlaying = false
        // }
        this.$store.dispatch('createBeatTrack', this.project)
      },
      createNoteTrack() {
        if (this.projectIsPlaying) {
          this.stopPlayer = true
        }
        // if (this.isPlaying) {
        //   this.loop.stop()
        //   this.isPlaying = false
        // }
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
