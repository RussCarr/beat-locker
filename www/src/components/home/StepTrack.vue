<template>
  <div class="beat-track container-fluid px-0">
    
    <div class="row">

      <div class="instrument-select col-2 pt-4">
        <div class="d-flex justify-content-around" v-if="isNoteTrack" v-model="note">
          <select class="note">
            <option selected disabled>{{stepTrack.instrumentName.charAt(0)}}</option>
            <option value="Ab">A-flat</option><option value="A">A</option><option value="A#">A-sharp</option>
            <option value="Bb">B-flat</option><option value="B">B</option><option value="B#">B-sharp</option>
            <option value="Cb">C-flat</option><option value="C">C</option><option value="C#">C-sharp</option>
            <option value="Db">D-flat</option><option value="D">D</option><option value="D#">D-sharp</option>
            <option value="Eb">E-flat</option><option value="E">E</option><option value="E#">E-sharp</option>
            <option value="Fb">F-flat</option><option value="F">F</option><option value="F#">F-sharp</option>
            <option value="Gb">G-flat</option><option value="G">G</option><option value="G#">G-sharp</option>
          </select>
          <select class="octave" v-model="octave">
            <option selected disabled>{{stepTrack.instrumentName.charAt(1)}}</option>
            <option v-for="n in 3">{{n+2}}</option>
          </select>
        </div>
        <div class="" v-if="!isNoteTrack">
          <instrumentDrop :defaultValue="stepTrack.instrumentName" v-on:inputChange="instrumentChange"></instrumentDrop>
        </div>
      </div>

      <div class="col-10 row">

        <div class="volume-controls col-3 ml-1 pt-4 row">
          <div class="track-volume col-8 px-0"> 
            <volumeSlider v-on:faderChange="faderChange" :setting="faderSetting"></volumeSlider>
          </div>
          <div class="col-4 px-0">
            <div class="mute" :class="{ 'engaged': muted }"  @click="muteTrack">mute</div>
            <div class="solo" :class="{ 'engaged': solo }"  @click="soloTrack">solo</div>
          </div>
        </div>

        <div class="track-steps col-8 d-flex flex-row px-0">
          <div class="bar-wrapper d-flex flex-row border border-dark" v-for="bar, barIndex in stepTrack.barCount"
          :style="{ width: (100 / stepTrack.barCount) + '%' }">
    
            <div class="step-wrapper border border-dark" v-for="step, stepIndexInBar in stepTrack.stepsPerBar"
            :style="{ width: (100 / stepTrack.stepsPerBar) + '%' }">
    
              <div class="step" @click="selectStep($event, (barIndex * stepTrack.stepsPerBar) + stepIndexInBar, barIndex, stepIndexInBar)"
              :class="{ 'selected': stepSequence[(barIndex * stepTrack.stepsPerBar) + stepIndexInBar], 'playing': stepIsPlaying(barIndex, stepTrack.stepsPerBar, stepIndexInBar) }"></div>
    
            </div>
    
          </div>
        </div>

        <div class="delete-control col-1 pt-4">
          <div class="">
            <button class="btn btn-sm btn-outline-light" @click="deleteTrack">
                <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
  import Tone from 'tone'
  import InstrumentDrop from './InstrumentDrop'
  import VolumeSlider from './VolumeSlider'
  export default {
    name: 'BeatTrack',
    components: {
      instrumentDrop: InstrumentDrop,
      volumeSlider: VolumeSlider
    },
    props: ['stepTrack'],
    data() {
      return {
        stepSequence: this.stepTrack.stepSequence,
        faderSetting: this.stepTrack.faderSetting,
        muted: false,
        solo: false,
        note: "",
        octave: ""
      }
    },
    computed: {
      isNoteTrack() {
        return this.stepTrack.isNote
      },
      projectTracks() {
        return this.$store.state.activeTracks
      },
      stepIndex() {
        return this.$store.state.stepIndex
      },
      isPlaying() {
        return this.$store.state.playingProjectId !== ""
      }
    },
    methods: {
      stepIsPlaying(barIndex, stepsPerBar, stepIndexInBar) {
        return (this.stepIndex == (barIndex * stepsPerBar) + stepIndexInBar) && this.isPlaying;
      },
      selectStep(event, Idx, barIdx, stepIdx) {
        // Note: 'Idx' locates the stepSequence index that needs to be toggled
        this.stepSequence[Idx] = this.stepSequence[Idx] ? false : true
        this.$store.dispatch('updateActiveTracks', {
          trackId: this.stepTrack._id,
          stepSequence: this.stepSequence
        })
        this.$emit('stepSequenceChange')

        // Toggle the clicked div from colored to white or vice versa:
        if (event.target.classList.contains('selected')) {
          event.target.classList.remove('selected')
        } else {
          event.target.classList.add('selected')
        }
      },
      instrumentChange(instrument) {
        this.$emit('stopPlayback') // Stop play-back if the instrument-choice has changed
        var updatedTrack = {
          '_id': this.stepTrack._id,
          instrumentName: instrument.name,
          instrumentSamplePath: instrument.samplePath,
          stepSequence: this.stepSequence
        }
        this.$store.dispatch('updateTrack', updatedTrack)
      },
      faderChange(value) {
        this.faderSetting = value
        var updatedTrack = {
          '_id': this.stepTrack._id,
          faderSetting: value,
          stepSequence: this.stepSequence
        }
        this.$store.dispatch('updateTrack', updatedTrack)
      },
      muteTrack() {
        // Do not allow muting to be engaged if any track is currently 'solo'
        if (!this.projectTracks.find(track => track.solo)) {
          this.muted = this.muted ? false : true
          this.$emit('muteTrack')
        }
      },
      soloTrack() {
        // Do not allow solo to be engaged if any other track is currently 'solo'
        if (!this.projectTracks.find(track => track._id !== this.stepTrack._id && track.solo)) {
          this.solo = this.solo ? false : true
          this.$emit('soloTrack')
        }
      },
      deleteTrack() {
        this.$emit('deleteTrack', this.stepTrack)
      }
    }
  }

</script>

<style>
  .btn {
    font-size: 0.75rem;
  }

  .beat-track {
    max-width: 1200px;
    margin: 0 auto;
  }

  .instrument-select {
    font-size: 0.65rem;
  }

  .bar-wrapper {
    background-color: rgba(251, 251, 251, 1.0);
    margin: 0.05rem;
  }

  .track-volume {
    min-width: 10%;
  }

  .solo {
    color: rgba(251, 251, 251, 1.0);
    font-size: .7rem;
    outline-color: rgba(251, 251, 251, 1.0);
    outline-style: solid;
    outline-width: 1px;
    padding-left:.2rem;
    padding-right: .2rem;
    margin-right: .4rem;
  }

  .solo:hover,.solo:active{
    background-color: rgba(206, 33, 53, 1.0);
    cursor: pointer;
  }

  .mute {
    color: rgba(251, 251, 251, 1.0);
    font-size: .7rem;
    outline-color: rgba(251, 251, 251, 1.0);
    outline-style: solid;
    outline-width: 1px;
    padding-left:.2rem;
    padding-right: .2rem;
    margin-right: .4rem;
  }

  .mute:hover,.mute:active {
    background-color: rgba(206, 33, 53, 1.0);
    cursor: pointer;
  }

  .mute.engaged,
  .solo.engaged {
    background-color: rgba(206, 33, 53, 1.0);
  }

  .step {
    height: 80px;
    background-color: white;
  }

  .selected {
    background-color: rgba(206, 33, 53, 1.0);
  }

  .playing {
    background-color: rgba(229, 140, 147, 0.5);
  }

  .selected.playing {
    background-color: rgba(206, 33, 53, 1.0);
  }

  .scrolling-wrapper {
    overflow-x: scroll;
  }

</style>
