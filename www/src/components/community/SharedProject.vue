<template>
  <div class="sharedTracks">
    <div class="row">
      <div class="col-2">
      </div>
      <div class="col-10">
        <div class="row">
          <div class="col-6">
            <a href="#" :class="{ 'text-light': playingProjectId === '', 'text-muted': playingProjectId !== '' }" @click.prevent="playProject"
              v-show="!isPlaying">
              <i class="far fa-play-circle m-l-5"></i>
            </a>
            <a href="#" class="text-light" @click.prevent="stopProject" v-show="isPlaying">
              <i class="far fa-stop-circle m-l-5"></i>
            </a>
            {{sharedProject.title}}
            <p class="createdBy">created by:</p>
<<<<<<< HEAD:www/src/components/community/SharedProject.vue
            <!-- <button @click="showProfile" class="createdUser">{{user.name}}</button> -->
            <a href="#" class="text-light mr-5"  @click.prevent="showProfile">
                {{user.name}}
              </a>
=======
            <button @click="showProfile" class="createdUser">{{sharedProject.userName}} Name</button>
>>>>>>> f99cdf58f42e22d0a75faa2040ebb4ede3d88d43:www/src/components/community/SharedProjects.vue
          </div>
          <div class="col-1">
            <a href="#" class="text-light mr-5" @click.prevent="forkProject(sharedProject)">
              <i class="fas fa-code-branch"></i> {{sharedProject.forkCount}}
            </a>
          </div>
          <div class="col-1">
            <a href="#" class="text-light" @click.prevent="shareBox= shareBox ? false : true">
              <i class="fas fa-share"></i>
            </a>
          </div>
          <div v-if="shareBox" class="shareButton">
            <p>
              <a class="share-icon" href="https://www.facebook.com/sharer/sharer.php?u=https://joe-r-davis.github.io/clone2/" target="_blank">
                <i class="fab fa-facebook"></i>
              </a>
            </p>
            <p>
              <a class="share-icon" href="https://twitter.com/intent/tweet?url=https://joe-r-davis.github.io/clone2/&text=TEXT&via=YOURTWITTERACCOUNTNAME"
                target="_blank">
                <i class="fab fa-twitter"></i>
              </a>
            </p>
            <p>
              <a class="share-icon" href="https://nodemailer.com/about/" target="_blank">
                <i class="fas fa-envelope"></i>
              </a>
            </p>
            <p>
              <a class="share-icon" href="https://www.twilio.com/" target="_blank">
                <i class="fas fa-mobile"></i>
              </a>
            </p>
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
    name: 'SharedProject',
    components: {
    },
    data() {
      return {
        loop: {},
        isPlaying: false,
        shareBox: false
      }
    },
<<<<<<< HEAD:www/src/components/community/SharedProject.vue
=======
    computed: {


    },
>>>>>>> f99cdf58f42e22d0a75faa2040ebb4ede3d88d43:www/src/components/community/SharedProjects.vue
    props: [
      'sharedProject',
      'playingProjectId',
      
    ],
    computed: {
      beatTracks() {
        return this.$store.state.previewTracks
      },
      user() {
        var projectUsers = this.$store.state.activeProjectUsers
        console.log('Project users',projectUsers)
        return projectUsers.find(user => user._id === this.sharedProject.userId)
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
  a.share-icon {
    color: white
  }

  a.share-icon:hover {
    color: rgba(206, 33, 53, 1.0)
  }

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