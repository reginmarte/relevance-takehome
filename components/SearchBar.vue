<template>
  <div class="mt-6 relative rounded-md">
    <label for="search" class="mt-2 text-md md:text-xl font-light font-semi">
      Text Query
    </label>
    <p class="text-sm md:text-md text-gray-500">
      Enter a text to search.
    </p>
    <input type="text" name="search" id="search" v-model="query"
           class="mt-2 focus:ring-blue-300 focus:outline-none w-full border-gray-300 rounded-md"
           placeholder="Search..."/>
  </div>
</template>

<script>
  export default {
    computed: {
      query: {
        get() {
          return this.$store.state.query
        },
        set(value) {
          this.$store.commit('setState', {key: 'query', value})
        }
      }
    }
  };
</script>




