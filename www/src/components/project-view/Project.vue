<template>
  <div class="project">
    <sidebar></sidebar>
    Project File
    <button>Add Bar</button>
    <button>Remove Bar</button>
    <input type="radio" id="one" value="4-bar" v-model="picked">
    <label for="one">4 Bar</label>
    <br>
    <input type="radio" id="two" value="3-bar" v-model="picked">
    <label for="two">3 Bar</label>
    <br>
    <span>Picked: {{ picked }}</span>
    <slider></slider>
    <slider></slider>
    <button>Mute</button>
    <button>Solo</button>
  </div>
</template>

<script>
  import SideBar from '../SideBar'
  import Slider from './Slider'
  export default {
    name: 'Project',
      components: {
      sidebar: SideBar,
      slider: Slider,
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
</style>