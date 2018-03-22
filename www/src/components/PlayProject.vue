<template>
  <div class="playProject">
    <a href="#" class="play text-light" v-if="!isPlaying" @click.prevent="play">
      <button class="playStopButtons">
        <i class="far fa-play-circle "></i>
      </button>
    </a>
    <a href="#" class="stop text-light" v-if="isPlaying" @click.prevent="stop">
      <button class="playStopButtons">
        <i class="far fa-stop-circle "></i>
      </button>
    </a>
  </div>
</template>

<script>
  import Tone from 'tone'
  // import BeatTrack from '../project-view/BeatTrack'
  import samplePaths from './samplePaths.js'
  export default {
    name: 'PlayProject',
    components: {
      // beatTrack: BeatTrack

    },
    data() {
      return {
        loop: {},
        isPlaying: false,
      }
    },
    props: ['project'],
    mounted() {
      this.$store.dispatch('getProjectTracks', this.project.trackIds)
    },
    computed: {
      beatTracks() {
        var tracks = this.$store.state.activeTracks
        // Sort the tracks from first-created (at top) to last-created (at bottom)
        return tracks.sort((trackA, trackB) => {
          return trackA.createdAt - trackB.createdAt
        })
      },
    },
    methods: {
      play() {

        this.$store.dispatch('getProjectTracks', this.project.trackIds).then(() => {
          this.isPlaying = true

          // Note: For audio files, you MUST 'require' a literal string-value to get Webpack to recognize the resource as a file path and locate it!!!!
          var requiredSamples = samplePaths

          var samples = {}
          this.beatTracks.forEach(track => {
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
              // console.log('player', player)

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
        this.isPlaying = false
      },

    }
  }

</script>

<style>
</style>