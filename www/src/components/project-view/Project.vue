<template>
  <div class="container project">
    <div class="row">
      <div class="col">
        <div class="col-3">
          <label for="one">4 Bar</label>
            <input for="one" lable="4 Bar" type="radio" id="one" value="4-bar" v-model="picked">
        <input type="radio" id="two" value="3-bar" v-model="picked">
          <label for="two">3 Bar</label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-1">
        <!-- <instrumentdrop></instrumentdrop> -->
      </div>
      <div class="col-2">
        <slider></slider>
      </div>
      <div class="col-1">
        <button class="btn btn-sm btn-primary btn-size-60">Mute</button>
        <button class="btn btn-sm btn-info btn-size-60">Solo</button>
      </div>
      <div class="col-5">
        <beattrack></beattrack>
      </div>
      <div class="col-1">
        <button>Add Bar</button>
        <button>Remove Bar</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <slider></slider>
      </div>
    </div>
    <sidebar></sidebar>
  </div>
</template>

<script>
  import SideBar from '../SideBar'
  import Slider from './Slider'
  import InstrumentDrop from './InstrumentDrop'
  import BeatTrack from './BeatTrack'
  export default {
    name: 'Project',
    components: {
      sidebar: SideBar,
      slider: Slider,
      instrumentdrop: InstrumentDrop,
      beattrack: BeatTrack,
    },
    data() {
      return {
        picked: ''
      }
    },
    methods: {

    },

  }
</script>

<style>
  .btn-size-60 {
width: 60px;
  }
</style>