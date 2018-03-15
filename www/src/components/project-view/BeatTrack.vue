<template>
  <div class="beat-track container-fluid px-0">

    <div class="d-flex flex-row align-items-center justify-content-center">

      <div class="track-controls">
        <!-- <span class="instrument pr-2">{{ beatTrack.instrumentName }}</span> -->
        <instrumentDrop :defaultValue="beatTrack.instrumentName"></instrumentDrop>
      </div>

      <div class="bar-wrapper d-flex flex-row border border-dark" v-for="bar, i in beatTrack.barCount">

        <div class="step-wrapper border border-dark" v-for="step, j in beatTrack.stepsPerBar">

          <div class="step" @click="selectStep($event, (i * 4) + j, i, j)"></div>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
  import Tone from 'tone'
  import InstrumentDrop from './InstrumentDrop'
  export default {
    name: 'BeatTrack',
    components: {
      instrumentDrop: InstrumentDrop
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

  .track-controls {
    min-width: 50%;
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
