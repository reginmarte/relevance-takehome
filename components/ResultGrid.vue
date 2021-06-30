<template>
  <div class="p-6" v-if="results && results.length > 0">
    <!--Results-->
    <p class="my-2 md:text-xl text-gray-700 font-light" v-model.lazy="query">Results for "{{ query }}"</p>
    <div class="mb-4 md:grid md:grid-cols-2 md:gap-4">
      <div v-for="result in results" class="space-y-4 mt-3 md:mt-1 p-4 bg-white shadow rounded-md ">
        <div v-for="(value, key) in result">
          <p class="text-sm md:text-md overflow-ellipsis overflow-hidden">{{ value }}</p>
          <p v-if="value" class="text-xs md:text-xs font-light text-gray-700">{{ clean(key) }} </p>
        </div>
      </div>
    </div>
  </div>
  <!--Welcome placeholder-->
  <div v-else-if="showWelcome"
       class="md:w-full md:h-screen flex flex-col items-center justify-center p-8 font-light font-semi">
    <p class="text-xl md:text-2xl text-gray-500">Welcome to Text Search!</p>
    <p class="mt-2 text-md md:text-lg text-gray-400">Select a collection to begin</p>
  </div>
  <!-- No results-->
  <div v-else-if="showNoResults"
       class="md:w-full md:h-screen flex flex-col items-center justify-center p-8 font-light font-semi">
    <h1 class="text-lg md:text-2xl font-light text-gray-700">Oops! No results found for "{{ query }}"</h1>
    <p class="text-md md:text-lg text-gray-500">Try adjusting your text search or selected fields</p>
  </div>
</template>

<script>
  export default {
    computed: {
      query() {
        return this.$store.state.query;
      },
      results() {
        return this.$store.state.results;
      },
      showWelcome() {
        return this.$store.state.status.showWelcome;
      },
      showNoResults() {
        return this.$store.state.status.showNoResults;
      }
    }
  }
</script>
