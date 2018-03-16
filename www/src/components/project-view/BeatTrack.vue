<template>
  <div class="beat-track container-fluid px-0">

    <div class="d-flex flex-row align-items-center justify-content-center">

      <div class="track-controls">
        <instrumentDrop :defaultValue="beatTrack.instrumentName" v-on:inputChange="instrumentChange"></instrumentDrop>
      </div>
      <div class="track-volume"> 
        <volumeSlider></volumeSlider>
      </div>
      <div>
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
      },
      instrumentChange(instrument) {
        var updatedTrack = {
          '_id': this.beatTrack._id,
          instrumentName: instrument.name,
          instrumentSamplePath: instrument.samplePath,
          stepSequence: this.stepSequence
        }
        this.$store.dispatch('updateTrack', updatedTrack)
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

  .step {
    width: 30px;
    height: 80px;
    background-color: white;
  }

  .selected {
    background-color: rgba(229, 140, 148, 1.0);
  }

  .scrolling-wrapper {
    overflow-x: scroll;
    /* overflow-y: hidden; */
    /* white-space: nowrap; */
  }

</style>
