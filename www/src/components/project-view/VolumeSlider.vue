<template>
        <div>
              <vue-slider class="mt-4" v-model="value"></vue-slider>
        </div>
      </template>
      <script>
        import vueSlider from 'vue-slider-component'
        export default {
          data() {
            return {
              value: 8,
              width: "auto",
              height: 6,
              direction: "horizontal",
              dotSize: 16,
              eventType: "auto",
              min: 0,
              max: 100,
              interval: 1,
              debug: false,
              disabled: false,
              show: true,
              realTime: false,
              tooltip: "always",
              clickable: true,
              tooltipDir: "top",
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
              piecewiseStyle: null,
            }
      
          },
          components: {
      
            vueSlider
          }
        }
      </script>
      
      <style>
      </style>