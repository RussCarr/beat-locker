<template>
  <div class="sharedTracks">
    <div class="row">
      <div class="col-2">

      </div>
      <div class="col-10">
        <div class="row">

          <div class="col-6">

            <a href="#" :class="{ 'text-light': playingProjectId === '', 'text-muted': playingProjectId !== '' }"
            @click.prevent="playProject" v-show="!isPlaying">
              <i class="far fa-play-circle m-l-5"></i>
            </a>
            <a href="#" class="text-light" @click.prevent="stopProject" v-show="isPlaying">
              <i class="far fa-stop-circle m-l-5"></i>
            </a>
            
            {{sharedProject.title}}
            <p class="createdBy">created by:</p>
            <button @click="showProfile" class="createdUser">{{sharedProject.userName}} Name</button>

          </div>
          <div class="col-1">
            <a href="#" class="text-light mr-5"  @click.prevent="forkProject(sharedProject)">
              <i class="fas fa-code-branch"></i> {{sharedProject.forkCount}}
            </a>
          </div>
          <div class="col-1">
            <a href="#" class="text-light"  @click.prevent="shareBox= shareBox ? false : true">
              <i class="fas fa-share"></i>
            </a>
          </div>
          <div v-if="shareBox" class="shareButton">
            <p>Facebook</p>
            <p>SMS:Twilio</p>
            <p>Twitter</p>
            <p>Email:mailgun</p>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Tone from 'tone'
  import samplePaths from './../project-view/samplePaths.js'
  export default {
    name: 'SharedProjects',
    components: {
    },
    data() {
      return {
        loop: {},
        isPlaying: false,
        shareBox: false
      }
    },
    computed: {
      
      
    },
    props: [
      'sharedProject',
      'playingProjectId',
      'sharedProject'

    ],
    computed: {
      beatTracks() {
        return this.$store.state.previewTracks
      }
    },
    methods: {
      forkProject(sharedProject) {
        console.log('fork project', sharedProject)
        this.$store.dispatch('cloneProject', sharedProject)
      },
      showProfile() {
        this.$emit('showProfile')
      },
      playProject() {
        if (this.playingProjectId !== "") { // If another project is already playing...
          return // ...don't allow user to play this one.
        }

        this.$store.dispatch('setPreviewTracks', this.sharedProject.trackIds).then(() => {

          this.isPlaying = true
          this.$emit('playing', this.sharedProject._id) // Inform the parent component (and via it, the other SharedProjects) that a project is now playing

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

          Tone.Transport.bpm.value = this.sharedProject.bpmSetting // Set beats-per-minute
          })
      },
      stopProject() {
        this.loop.stop()
        this.$emit('playing', "") // Clear out the notification that a SharedProject is currently playing
        this.isPlaying = false
      }
    }
  }

</script>

<style scoped>
  .sharedTracks {
    color: white;
  }

  .createdBy {
    font-size: 10px;
    color: white;
  }

  .createdUser {
    font-size: 10px;
    color: white;
  }

  .shareButton {
    border: 2px solid white;
    width: 100px;
    /* height: 80px; */
  }

  p {
    margin: -1px;

  }
</style>