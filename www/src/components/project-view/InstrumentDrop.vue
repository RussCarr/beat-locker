<template>
    <div class="instrumentDrop">
      <select v-model="inputSelect" @change="inputChange">
        <option disabled value="">Instrument Input</option>
        <option :value="{name: name, samplePath: sample}" v-for="(sample, name) in sampleSounds">{{name}}</option>
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
      },
      methods: {
        inputChange(){
          this.$emit('inputChange', this.inputSelect)
        }
      }
    
    }
  </script>
  
  <style>
  
    
  </style>