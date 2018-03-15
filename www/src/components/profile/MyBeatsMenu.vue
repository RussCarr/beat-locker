<template>
  <div class="myBeatsMenu">
    <div class="row">
      <div class="col header">
        <h2>My Beats</h2>
      </div>
    </div>
    <myBeats></myBeats>
    <myBeats></myBeats>
    <myBeats></myBeats>
    <myBeats></myBeats>
    <myBeats></myBeats>
    <myBeats></myBeats>
    <myBeats></myBeats>
    <myBeats></myBeats>
    <myBeats></myBeats>
    <myBeats></myBeats>
  </div>
</template>

<script>
  import MyBeats from './MyBeats'
  export default {
    name: 'MyBeatsMenu',

    components: {
      myBeats: MyBeats
    },
  }

</script>

<style>
</style>