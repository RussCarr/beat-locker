<template>
  <div>
    <vue-slider ref='slider' v-bind="defaultSlider" class="mt-4" v-model="defaultSlider.value"></vue-slider>
    
  </div>
</template>
<script>
  import vueSlider from 'vue-slider-component'
  export default {
    components: {
      vueSlider
    },
    data() {
      return {
        defaultSlider: {
          value: 0,
          width: 'auto',
          height: 6,
          direction: 'horizontal',
          dotSize: 16,
          eventType: 'auto',
          min: 0,
          max: 100,
          interval: 1,
          debug: process && process.env && process.env.NODE_ENV !== 'production',
          disabled: false,
          show: true,
          realTime: false,
          tooltip: 'always',
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
  }
</script>

<style>
</style>