<template>
  <div class="container myBeats">
    <div class="row">
      <div class="col-2 mr-2">
        <div class="">
          <label class="switch">
            <input type="checkbox">
            <span class="slider round"></span>
          </label>
          <p class="text-center">Private</p>
        </div>
      </div>
      <div class="col-6">
        <h5 @click="showStats = showStats ? false : true" class="btn-link text-white text-center">Track Name =</h5>
      </div>
      <div class="col-1">
          <button @click='closeTrackStats' class="btn btn-sm btn-dark">></button>
        </div>
      <div class="col-1">
        <button class="btn btn-sm btn-danger">Delete</button>
      </div>
    </div>
    <div class="trackStats" v-if="showStats">
      <div class="row">
        <div class="col text-center">
          <p>plays 4</p>
        </div>
      </div>
      <div class="col text-center">
        <p>plays 4</p>
      </div>
      <div class="col text-center">
        <p>plays 4</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Mybeats',
    data() {
      return {
        showStats: false
      }
    },
    methods: {
      closeTrackStats() {
        this.showStats = false
      },
      showTrackStats() {
        this.showStats = true
      },
    }
  }
</script>

<style>
  .mybeats {
    display: flex;
  }

  .header {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    align-self: center;

  }

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  /* Hide default HTML checkbox */

  .switch input {
    display: none;
  }

  /* The slider */

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked+.slider {
    background-color: #2196F3;
  }

  input:focus+.slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked+.slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  .trackTitle {
    font-size: 20px;
    color: #fbfbfb
  }
</style>