<template>
  <div>
    <vue-slider ref='slider' v-bind="config" v-model="value" @drag-end="changeFader"></vue-slider>
    
  </div>
</template>
<script>
  import vueSlider from 'vue-slider-component'
  export default {
    components: {
      vueSlider
    },
    props: [ 'setting' ],
    computed: {
      value: {
        get() {
          return this.setting === this.config.value ? this.config.value : this.setting
        },
        set(value) {
          this.config.value = value
        }
      }
    },
    data() {
      return {
        config: {
          value: 7,
          width: 'auto',
          height: 6,
          direction: 'horizontal',
          dotSize: 16,
          eventType: 'auto',
          min: 0,
          max: 10,
          interval: 1,
          debug: process && process.env && process.env.NODE_ENV !== 'production',
          disabled: false,
          show: true,
          realTime: false,
          tooltip: 'hover',
          clickable: true,
          tooltipDir: 'top',
          piecewise: false,
          lazy: false,
          useKeyboard: false,
          reverse: false,
          speed: 0.5,
          formatter: null,
          focusStyle: null,
          bgStyle: null,
          sliderStyle: null,
          tooltipStyle: null,
          processStyle: null,
          piecewiseStyle: null
        },
      }
    },
    methods: {
      changeFader() {
        this.$emit('faderChange', this.config.value)
      }
    }
  }
</script>

<style>
</style>