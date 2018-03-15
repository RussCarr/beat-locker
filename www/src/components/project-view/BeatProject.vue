<template>
  <div class="text-center">
    <h1>Project Editor</h1>

    <div class="project">

      <beatTrack v-for="beatTrack in beatTracks" :key="beatTrack._id" :beatTrack="beatTrack"></beatTrack>

      <div class="controls mt-4">
        <button class="play btn" @click="play">Play</button>
        <button class="stop btn" @click="stop">Stop</button>
      </div>

    </div>

  </div>
</template>

<script>
  import Tone from 'tone'
  import BeatTrack from './BeatTrack'
  import samplePaths from './samplePaths.js'
  export default {
    name: 'Project',
    components: {
      beatTrack: BeatTrack
    },
    data() {
      return {
        loop: {}
      }
    },
    computed: {
      beatTracks() {
        return this.$store.state.activeTracks
      },
      project() {
        return this.$store.state.activeProject
      }
    },
    methods: {
      play() {
        // Note: For audio files, you MUST use 'require' a literal string-value to get Webpack to recognize the resource as a file path and locate it!!!!
        var requiredSamples = samplePaths

        var samples = {}
        this.beatTracks.forEach(track => {
          var name = track.instrument.name
          var resource = requiredSamples[name]
          samples[name] = resource
        })
        var sampleNames = Object.keys(samples)

        var players = new Tone.Players(samples).toMaster()

        // Define sequence options:
        // 1. Create an array of integers with length equal to the length of the current track stepSequences
        var events = new Array(this.beatTracks[0].stepSequence.length).fill(0).map( (_,i) => i)
        // 2. Define the subdivision timing between which events are placed: 16th-note
        var subdivision = '16n'

        // Create the beat sequence
        this.loop = new Tone.Sequence((time, index) => {
          for (var i = 0; i < this.beatTracks.length; i++) {
            var track = this.beatTracks[i].stepSequence

            if (track[index] === true) {
              // Use slightly randomized velocities
              var velocity = Math.random() * 0.5 + 0.5
              players.get(sampleNames[i]).start(time, 0, "32n", 0, velocity)
            }
          }
        }, events, subdivision)

        Tone.Transport.start()
        this.loop.start()
      },
      stop() {
        this.loop.stop()
      }
    }
  }

</script>

<style>


</style>
