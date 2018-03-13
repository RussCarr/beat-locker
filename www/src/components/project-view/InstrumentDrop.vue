<template>
    <div class="instrumentDrop">
      <select v-model="inputSelect">
        <option disabled value="">Instrument Input</option>
        <option :value="sample" v-for="(sample, name) in sampleSounds">{{name}}</option>
      </select> 
      
    </div>
  </template>
  
  <script>
    import samples from "./../../assets/audio/samples.json"
    export default {
      name: 'InstrumentDrop',
      data() {
        return {
        inputSelect: ''
        }
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