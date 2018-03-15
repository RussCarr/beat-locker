<template>
  <div class="container-fluid project">
    <div class="col">
      <div class="row">
        <beatProject></beatProject>
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