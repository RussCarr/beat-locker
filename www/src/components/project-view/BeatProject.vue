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
        return this.$store.state.activeBeatTracks
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

        this.loop = new Tone.Sequence((time, index) => {
          for (var i = 0; i < this.beatTracks.length; i++) {
            var track = this.beatTracks[i].stepSequence

            if (track[index] === true) {
              //slightly randomized velocities
              var vel = Math.random() * 0.5 + 0.5
              players.get(sampleNames[i]).start(time, 0, "32n", 0, vel)
            }
          }
        }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n")

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
