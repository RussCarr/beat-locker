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
    props: ['setting'],
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
          value: 5,
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
          bgStyle: {
            "backgroundColor": "#fff",
            "boxShadow": "inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)"
          },
          sliderStyle: {
            "backgroundColor": "rgba(150, 16, 33, 1.0)"
          },
          tooltipStyle: {
            "backgroundColor": "rgba(206, 33, 53, 1.0)",
            "borderColor": "rgba(150, 16, 33, 1.0)"
          },
          processStyle: {
            "backgroundColor": "rgba(206, 33, 53, 1.0)",
            "boxShadow": "inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)"
          },
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
