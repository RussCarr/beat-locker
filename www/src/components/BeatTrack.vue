<template>
  <div class="beat-track container-fluid">

    <div class="d-flex flex-row align-items-center justify-content-center">

      <span class="instrument pr-2">{{ beatTrack.instrument.title }}</span>

      <div class="bar-wrapper d-flex flex-row" v-for="bar, i in beatTrack.barCount">

          <div class="step-wrapper p-1" v-for="step, j in beatTrack.stepsPerBar">
            {{ (i * 4) + j }}

            <div class="step border" @click="selectStep($event, (i * 4) + j, i, j)"></div>

          </div>

      </div>

    </div>

  </div>
</template>

<script>
  import Tone from 'tone'
  export default {
    name: 'BeatTrack',
    props: [ 'beatTrack' ],
    data() {
      return {
        stepSequence: this.beatTrack.stepSequence
      }
    },
    methods: {
      selectStep(event, Idx, barIdx, stepIdx) {
        // Note: 'Idx' locates the stepSequence index that needs to be toggled
        this.stepSequence[Idx] = this.stepSequence[Idx] ? false : true
        this.$store.dispatch('updateActiveTracks', {trackId: this.beatTrack._id, stepSequence: this.stepSequence})
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
  .step {
    width: 30px;
    height: 40px;
    background-color: white;
  }

  .selected {
    background-color: tomato;
  }

  .scrolling-wrapper {
    overflow-x: scroll;
    /* overflow-y: hidden; */
    white-space: nowrap;
  }
</style>