<template>
  <div v-if="query">
    <h3 class="md:text-xl text-gray-700 font-light">
      Results for "{{ query }}"
    </h3>
    <div class="md:grid md:grid-cols-4 md:gap-3">
      <span v-for="n in 10" class="mt-1 text-sm text-gray-600">
        <div class="space-x-6 space-y-6 p-5 md:p-8 bg-white shadow rounded-md">
         <p class="overflow-ellipsis overflow-hidden">dgk;fngknfgkdfasdsf {{ n }}</p>
        </div>
      </span>
    </div>
  </div>
  <div v-else-if="onerror">
    <p class="text-md md:text-xl font-light font-semi">Oops! Something went wrong. Please try again later</p>
  </div>
  <div v-else>
    <p class="text-md md:text-xl font-light text-gray-400 font-semi">Select a collection to begin</p>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        query: this.$store.state.query
      }
    }
  }
</script>

<style scoped>

</style>
