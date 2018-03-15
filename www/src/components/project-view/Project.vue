<template>
  <div class="container-fluid project">
    <div class="col">
      <div class="div">
        <p>
          <i class="far fa-edit"></i>
        </p>
        <h1>Project Title</h1>
      </div>
      <div class="row">
        <div class="col-2"></div>
        <div class="col">
          <div class="col-6">
            <label for="one">4 Bar</label>
            <input for="one" lable="4 Bar" type="radio" id="one" value="4-bar" v-model="picked">
            <input type="radio" id="two" value="3-bar" v-model="picked">
            <label for="two">3 Bar</label>
          </div>
        </div>
      </div>
      <div class="row">
        <beatProject></beatProject>

        <!-- <div class="col-1"></div>
        <div class="col-1">
          <instrumentdrop></instrumentdrop>
        </div>
        <div class="col-1 m-3">
          <slider></slider>
        </div>
        <div class="col-1">
          <button class="btn btn-sm btn-primary btn-size-60 mr-4">Mute</button>
          <button class="btn btn-sm btn-info btn-size-60 mr-4">Solo</button>
        </div>
        <div class="col-5">
          <beattrack></beattrack>
        </div>
        <div class="col-2">
          <button class="btn btn-sm btn-primary btn-size-160">Add Bar</button>
          <button class="btn btn-sm btn-danger btn-size-160">Remove Bar</button>
        </div> -->
      </div>
      <div class="container">
        <div class="row">
          <div class="col-3"></div>
          <div class="col-6 mt-4">
            <slider></slider>
          </div>
          <!-- <div class="col-2"></div> -->
        </div>
      </div>
      <!-- <sidebar></sidebar> -->
    </div>
  </div>
</template>

<script>
  import SideBar from '../SideBar'
  import Slider from './Slider'
  import InstrumentDrop from './InstrumentDrop'
  import BeatProject from './BeatProject'
  export default {
    name: 'Project',
    components: {
      sidebar: SideBar,
      slider: Slider,
      instrumentdrop: InstrumentDrop,
      beatProject: BeatProject
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
  body{
    background-color: #372529;
  }
  
  .btn-size-60 {
    width: 60px;
  }

  .btn-size-160 {
    width: 160px;
  }
</style>