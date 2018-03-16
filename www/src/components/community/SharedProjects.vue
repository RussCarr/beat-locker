<template>
  <div class="sharedTracks">
    <div class="row">
      <div class="col-2">
        <div class="">
          <button>Play</button>
        </div>
      </div>
      <div class="col-8">
        {{allSharedProject.title}}
      </div>
      <div class="col-1">
        #1<button>Share</button>
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
    props: [
    'allSharedProject'
    ],
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