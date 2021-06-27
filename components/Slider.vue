<template>
  <div class="mt-6">
    <label for="slider" class="mt-2 text-md md:text-xl font-light font-semi">
      Search Weighting
    </label>
    <p class="text-sm md:text-md text-gray-500">
      Set the weight to favour traditional text search over vector search
    </p>
    <input id="slider" class="w-full" type="range" min=minVal max=maxVal v-model="value">
    <div class="flex justify-between text-xs text-gray-500">
      <span class="left-0">TEXT</span>
      <span class="right-0">VECTOR</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      minVal: String,
      maxVal: String,
      defaultVal: Number
    },
    data: function () {
      return {
        value: this.defaultVal
      }
    }
  }
</script>

<style scoped>
</style>
