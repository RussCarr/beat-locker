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
        // allowPlayCountUpdate: false
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
      'tracksFromParent',
      // A bool that controls whether playing the project will update the project's play-count
      'allowPlayCountUpdate'
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

        if (this.allowPlayCountUpdate == true) {
          if (this.isPlaying = true) {
            // console.log('Before trying to count plays', this.project.playCount)
            // this.project.playCount++
            // console.log('After trying to count plays', this.project.playCount)
            this.updatePlayCount()
          }
        }

        // Get an array of the tracks that belong to this project and make it available as 'previewTracks' in the Vuex store...
        this.$store.dispatch('setPreviewTracks', this.project.trackIds).then(() => { // ...then continue.
          this.isPlaying = true
          this.$store.dispatch('setPlayingProjectId', this.project._id) // Inform the parent component (and via it, the other SharedProjects) that a project is now playing

          // Note: For audio files, you MUST 'require' a literal string-value to get Webpack to recognize the resource as a file path and locate it!!!!
          var requiredSamples = samplePaths

          var samples = {}
          var notes = {}

          this.stepTracks.forEach((track, i) => {
            // Build a collection of data for the drum-sample tracks
            if (!track.isNote) {
              var name = track.instrumentName
              var resource = requiredSamples[name]
              samples[i] = resource
            }
            // Build a colection of data for the "note" tracks
            if (track.isNote) {
              var note = track.instrumentName
              var stepSequence = track.stepSequence
              notes[i] = { note: note, stepSequence: stepSequence }
            }
          })
          // Names for each of the drum samples (needed to create 'beatPlayers' below)
          var sampleNames = Object.keys(samples)

          // DEBUG
          console.log("notes", notes)

          // Subset of stepTracks that are drum-sample tracks
          var beatTracks = this.stepTracks.filter(track => !track.isNote)

          var beatPlayers = new Tone.Players(samples, () => {
            // These statements will run once the beatPlayers' buffers have loaded. This ensures all have loaded before the loop will attempt to run.
            Tone.Transport.start() // Start ToneJS's core time-keeper
            this.loop.start() // Start the loop play-back
          }).toMaster() // Connect the beatPlayers to the master audio output (i.e. the speakers)

          // Define sequence options:
          // 1. Create an array of integers with length equal to the length of the current track stepSequences
          var events = new Array(this.stepTracks[0].stepSequence.length).fill(0).map((_, i) => i)
          // 2. Define the subdivision timing between which events are placed: 16th-note
          var subdivision = '16n'

          // Create the polysynth for note tracks
          var synth = new Tone.PolySynth(this.stepTracks.length, Tone.Synth).toMaster()

          // Create the beat sequence
          this.loop = new Tone.Sequence((time, index) => {

            // Update store state to keep track of the step index that is currently looping: This allows the loop playback to be animated
            this.$store.dispatch('stepIndexChange', index)

            
            // Create a ToneJS polysynth to play each "note" selected at the current loop index
            var notesToPlay = []
            for (const note in notes) {
              const noteData = notes[note]            
              if (noteData.stepSequence[index]) {
                notesToPlay.push(noteData.note)
              }
            }
            
            // Configure the polysynth for the current loop cycle
            synth.voices = notesToPlay
            synth.triggerAttackRelease(notesToPlay, subdivision, time)
          
            // for (var i = 0; i < this.stepTracks.length; i++) {
            for (var i = 0; i < beatTracks.length; i++) {
              // var track = this.stepTracks[i]
              var track = beatTracks[i]
              var stepSequence = track.stepSequence

              // Get an instance of Tone.Player for the current track
              var player = beatPlayers.get(sampleNames[i])

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
      updatePlayCount() {
        this.$store.dispatch('updatePlayCount', this.project)
        
      }

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