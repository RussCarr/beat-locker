<template>
  <div class="sharedTracks">
    <div class="row">
      <div class="col-2">
        <div class="">
          <button>Play</button>
        </div>
      </div>
      <div class="col-8">
        Tracks Name
      </div>
      <div class="col-1">
        #1<button>S</button>
      </div>
      <div class="col-1">
        #4<button>F</button> 
      </div>
    </div>

  </div>
</template>

<script>

  export default {
    name: 'SharedTracks',
    components: {
    },
    data() {
      return {

      }
    },
    methods: {
      instSelect() {
        //
      }
    }
  }

</script>

<style scoped>
  .sharedTracks {
    color: white;
  }
</style>