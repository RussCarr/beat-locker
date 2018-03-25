<template>
  <div class="player">

    <a href="#" :class="{ 'play-button': playingProjectId === '', 'text-muted': playingProjectId !== '' }" @click.prevent="play"
      v-show="!isPlaying">
      <i class="far fa-play-circle m-l-5" :class="{ 'fa-3x': largeButtons === true }"></i>
    </a>
    <a href="#" class="play-button" @click.prevent="stop" v-show="isPlaying">
      <i class="far fa-stop-circle m-l-5" :class="{ 'fa-3x': largeButtons === true }"></i>
    </a>
    
  </div>
</template>

<script>
  import Tone from 'tone'
  import samplePaths from './samplePaths.js'
  export default {
    name: 'Player',
    data() {
      return {
        loop: {},
        isPlaying: false,
      }
    },
    props: [
      // The Project to be played must be passed in as a prop.
      'project',
      // A bool can be passed in as a prop that (if TRUE) will make the play/stop buttons big
      'largeButtons',
      // A bool that the parent can use to 'tell' the Player to stop playback
      'stopPlayer',
      // An array of tracks that can be passed in from the parent
      'tracksFromParent'
    ],
    watch: {
      // Respond to a stop 'command' from the parent component
      stopPlayer(value) {
        if (value === true) {
          this.stop()
        }
      }
    },
    computed: {
      stepTracks() {
        if (this.tracksFromParent) { // If the parent component needs to specify which tracks to play...
          return this.tracksFromParent // ... let it do so.
        } else {
          return this.$store.state.previewTracks // Otherwise, get the tracks from Vuex state.
        }
      },
      playingProjectId() {
        // The ID of any Project that is currently playing (or "", if none is playing)
        return this.$store.state.playingProjectId
      },
      otherProjectIsPlaying() {
        return this.playingProjectId !== ""
      }
    },
    methods: {
      play() {
        // Reset 'stopPlayer' value on parent component
        if (this.stopPlayer === true) {
          this.$emit('resetStopPlayer')
        }

        if (this.otherProjectIsPlaying) { // If another project is already playing...
          return // ...don't allow user to play this one.
        }

        // Get an array of the tracks that belong to this project and make it available as 'previewTracks' in the Vuex store...
        this.$store.dispatch('setPreviewTracks', this.project.trackIds).then(() => { // ...then continue.
          this.isPlaying = true
          this.$store.dispatch('setPlayingProjectId', this.project._id) // Inform the parent component (and via it, the other SharedProjects) that a project is now playing

          // Note: For audio files, you MUST 'require' a literal string-value to get Webpack to recognize the resource as a file path and locate it!!!!
          var requiredSamples = samplePaths

          var samples = {}
          this.stepTracks.forEach(track => {
            var name = track.instrumentName
            var resource = requiredSamples[name]
            samples[name] = resource
          })
          var sampleNames = Object.keys(samples)

          var players = new Tone.Players(samples, () => {
            // These statements will run once the players' buffers have loaded. This ensures all have loaded before the loop will attempt to run.
            Tone.Transport.start() // Start ToneJS's core time-keeper
            this.loop.start() // Start the loop play-back
          }).toMaster() // Connect the players to the master audio output (i.e. the speakers)

// Experimental note-synth: PROOF OF CONCEPT
// const synth = new Tone.Synth()
// synth.toMaster()
// var note = "C4"
// var toneStepSequence = [false, true, false, false, false, true, false, false, false, true, false, false, false, false, false, false]

          // Define sequence options:
          // 1. Create an array of integers with length equal to the length of the current track stepSequences
          var events = new Array(this.stepTracks[0].stepSequence.length).fill(0).map((_, i) => i)
          // 2. Define the subdivision timing between which events are placed: 16th-note
          var subdivision = '16n'

          // Create the beat sequence
          this.loop = new Tone.Sequence((time, index) => {

// Experimental note play: PROOF OF CONCEPT
// if (toneStepSequence[index]) {
//   synth.triggerAttackRelease(note, "16n", time)
// }

            for (var i = 0; i < this.stepTracks.length; i++) {
              var track = this.stepTracks[i]
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
        })


      },
      stop() {
        this.loop.stop()
        this.$store.dispatch('setPlayingProjectId', "") // Clear out the notification that a SharedProject is currently playing
        this.isPlaying = false
      },

    }
  }

</script>

<style>
  .play-button {
    color: white;
  }

  .play-button:hover {
    color: rgba(206, 33, 53, 1.0);
  }

</style>
