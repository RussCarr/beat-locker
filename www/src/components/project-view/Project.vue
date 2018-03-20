<template>  
  <div>
    <beatProject></beatProject>
  </div>
</template>

<script>
  import SideBar from '../SideBar'
  import InstrumentDrop from './InstrumentDrop'
  import BeatProject from './BeatProject'
  export default {
    name: 'Project',
    components: {
      sidebar: SideBar,
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