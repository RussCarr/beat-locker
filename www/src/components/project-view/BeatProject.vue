<template>
  <div class="text-center mt-4 mb-5">

    <div class="project">

      <div class="board p-1">
        <beatTrack v-for="beatTrack in beatTracks" :key="beatTrack._id" :beatTrack="beatTrack" v-on:muteTrack="toggleMute(beatTrack)"
          v-on:soloTrack="toggleSolo(beatTrack)" v-on:stopPlayback="stop"></beatTrack>
      </div>

    </div>

    <div class="bottom-controls">
      <div class="controls mt-4">
        <a href="#" class="play text-light" v-if="!isPlaying" @click.prevent="play">
          <button class="playStopButtons">
            <i class="far fa-play-circle fa-3x"></i>
          </button>
        </a>
        <a href="#" class="stop text-light" v-if="isPlaying" @click.prevent="stop">
          <button class="playStopButtons">
            <i class="far fa-stop-circle fa-3x"></i>
          </button>
        </a>
      </div>

      <div class="bpm-slider-container mt-3 text-center">
        <input type="range" min=40 max="214" v-model="bpmSetting" class="bpm-slider" @change="bpmChange">
        <span class="bpm d-inline-block text-light mt-1"><small>BPM: {{bpmSetting}}</small></span>
      </div>

      <div class="text-left my-4">
        <div v-if="!showTitleEdit">
          <span class="project-title h5 text-light">Name: {{projectTitle}}</span>
          <a href="#" class="title-edit-toggle text-light ml-3" @click="showTitleEdit = true">
            <i class="fas fa-pencil-alt"></i>
          </a>
        </div>
        <div v-if="showTitleEdit">
          <input type="text" class="form-control" v-model="projectTitle">
          <button class="btn btn-sm px-4" @click="updateTitle">save</button>
          <button class="btn btn-sm px-4" @click="showTitleEdit = false">cancel</button>
        </div>

        <button class="save btn btn-sm btn-outline-light px-4 mt-3 d-block" @click="saveProject">Save</button>
      </div>
    </div>


  </div>
</template>

<script>
  import Tone from 'tone'
  import BeatTrack from './BeatTrack'
  import samplePaths from './samplePaths.js'
  export default {
    name: 'BeatProject',
    components: {
      beatTrack: BeatTrack
    },
    data() {
      return {
        updatedProjectTitle: "",
        showTitleEdit: false,
        loop: {},
        isPlaying: false,
        bpmSetting: 120
      }
    },
    computed: {
      projectTitle: {
        get() {
          return this.updatedProjectTitle !== "" ? this.updatedProjectTitle : this.$store.state.activeProject.title
        },
        set(value) {
          this.updatedProjectTitle = value
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
      beatTracks() {
        return this.$store.state.activeTracks
      },
      project() {
        return this.$store.state.activeProject
      }
    },
    methods: {
      play() {
        this.isPlaying = true

        // Note: For audio files, you MUST 'require' a literal string-value to get Webpack to recognize the resource as a file path and locate it!!!!
        var requiredSamples = samplePaths

        var samples = {}
        console.log('beatTracks', this.beatTracks[0])
        this.beatTracks.forEach(track => {
          var name = track.instrumentName
          var resource = requiredSamples[name]
          samples[name] = resource
        })
        var sampleNames = Object.keys(samples)

        var players = new Tone.Players(samples).toMaster()

        // Define sequence options:
        // 1. Create an array of integers with length equal to the length of the current track stepSequences
        var events = new Array(this.beatTracks[0].stepSequence.length).fill(0).map((_, i) => i)
        // 2. Define the subdivision timing between which events are placed: 16th-note
        var subdivision = '16n'

        // Create the beat sequence
        this.loop = new Tone.Sequence((time, index) => {
          for (var i = 0; i < this.beatTracks.length; i++) {
            var track = this.beatTracks[i]
            var stepSequence = track.stepSequence

            // Get an instance of Tone.Player for the current track
            var player = players.get(sampleNames[i])

            if (stepSequence[index] === true) {
              var volume = Math.pow(2, track.faderSetting) * 0.01 // Linear-to-logarithmic conversion (customized)
              player.volume.input.value = volume // Update the volume setting
              player.volume.overridden = true // Apply the updated setting

              if (track.muted) {
                player.mute = true // Mute the player
              }

              var velocity = Math.random() * 0.5 + 0.5 // Use slightly randomized velocities
              player.start(time, 0, "32n", 0, velocity)
            }
          }
        }, events, subdivision)

        Tone.Transport.bpm.value = this.project.bpmSetting // Set beats-per-minute
        console.log('bpm setting', this.project.bpmSetting, 'Tone.Transport.bpm.value', Tone.Transport.bpm.value)

        Tone.Transport.start() // Start ToneJS's core time-keeper
        this.loop.start() // Start the loop play-back
      },
      stop() {
        this.loop.stop()
        this.isPlaying = false
      },
      saveProject() {
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
          title: this.projectTitle
        }
        this.$store.dispatch('updateProject', updatedProject)
        this.showTitleEdit = false
      },
      bpmChange() {
        this.stop() // Stop play-back if the BPM setting changes
        var value = Number(this.bpmSetting)
        var updatedProject = {
          '_id': this.project._id,
          bpmSetting: value
        }
        this.$store.dispatch('updateProject', updatedProject)
      }
    }
  }

</script>

<style>
  .bottom-controls {
    min-width: 100%;
    padding-left: 37%;
  }

  .playStopButtons {
    background: none;
    border: none;
    color: white;
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
