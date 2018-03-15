<template>
  <div class="beat-track container-fluid px-0">

    <div class="d-flex flex-row align-items-center justify-content-center">

      <div class="track-controls">
        <instrumentDrop :defaultValue="beatTrack.instrumentName"></instrumentDrop>
      </div>
      <div class="track-volume"> 
        <volumeSlider></volumeSlider>
      </div>
      <div class="muteSolo">
        <div class="mute">mute</div>
        <div class="solo">solo</div>
      </div>

      <div class="bar-wrapper d-flex flex-row border border-dark" v-for="bar, barIndex in beatTrack.barCount">

        <div class="step-wrapper border border-dark" v-for="step, stepIndexInBar in beatTrack.stepsPerBar">

          <div class="step" @click="selectStep($event, (barIndex * beatTrack.stepsPerBar) + stepIndexInBar, barIndex, stepIndexInBar)"
          :class="{ 'selected': stepSequence[(barIndex * beatTrack.stepsPerBar) + stepIndexInBar] }"></div>

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
    props: ['beatTrack'],
    data() {
      return {
        stepSequence: this.beatTrack.stepSequence
      }
    },
    methods: {
      selectStep(event, Idx, barIdx, stepIdx) {
        // Note: 'Idx' locates the stepSequence index that needs to be toggled
        this.stepSequence[Idx] = this.stepSequence[Idx] ? false : true
        this.$store.dispatch('updateActiveTracks', {
          trackId: this.beatTrack._id,
          stepSequence: this.stepSequence
        })
        this.$emit('stepSequenceChange')

        // Toggle the clicked div from colored to white or vice versa:
        if (event.target.classList.contains('selected')) {
          event.target.classList.remove('selected')
        } else {
          event.target.classList.add('selected')
        }
      }
    }
  }

</script>

<style>
  .bar-wrapper {
    background-color: rgba(251, 251, 251, 1.0);
    margin: 0.05rem;
  }

  .track-volume {
    min-width: 10%;
    max-width: 50px;
  }

  .muteSolo {
    color: rgba(251, 251, 251, 1.0);
    font-size: .7rem;
    outline-color: rgba(251, 251, 251, 1.0);
    outline-style: solid;
    outline-width: 1px;
  }

  .mute {
    outline-color: rgba(251, 251, 251, 1.0);
    outline-style: solid;
    outline-width: 1px;
  }

  .step {
    width: 30px;
    height: 80px;
    background-color: white;
  }

  .selected {
    background-color: tomato;
  }

  .scrolling-wrapper {
    overflow-x: scroll;
    /* overflow-y: hidden; */
    /* white-space: nowrap; */
  }

</style>
