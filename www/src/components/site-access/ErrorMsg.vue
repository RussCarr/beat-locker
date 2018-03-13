<template>
  <div class="errorMsg bg-danger my-2 py-3">
    <span class="h3 d-block text-center text-white">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'ErrorMsg'
}
</script>

<style scoped>

</style>
  