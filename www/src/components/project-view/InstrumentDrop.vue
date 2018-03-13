<template>
    <div class="instrumentDrop">
      <select v-model="inputSelect">
        <option disabled value="">Instrument Input</option>
        <!-- <option :value="" {{key.value}}</option> -->
      </select> 
      
    </div>
  </template>
  
  <script>
    import samples from "./../../assets/audio/samples.json"
    export default {
      name: 'InstrumentDrop',
      data: {
        inputSelect
      },
      computed: {
        sampleSounds() {
          return samples
        }
      }
    
    }
  </script>
  
  <style>
  
    
  </style>