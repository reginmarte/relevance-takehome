<template>
  <div class="mt-3 relative">
    <!-- Loading collections-->
    <div v-if="$fetchState.pending" class="flex flex-col items-center mt-5">
      <div>
        <svg class="animate-spin h-6 w-6" viewBox="0 0 50 50">
          <circle class="path" cx="25" cy="25" r="20" fill="none" stroke="gray" stroke-width="5" stroke-dasharray="180"
                  stroke-dashoffset="75"></circle>
        </svg>
      </div>
      <span class="mt-1 text-sm text-gray-500">Fetching collections ...</span>
    </div>
    <!-- On error-->
    <p v-else-if="$fetchState.error" class="text-sm text-gray-400">An error occurred :(</p>
    <!-- On success-->
    <div v-else>
      <p class="pl-1 text-md text-gray-500">in</p>
      <select name="options" id="options-select" v-model="option" v-if="options" @change="onChangeOption"
              class="w-full mt-1 text-sm md:text-lg font-light focus:ring-blue-300 focus:outline-none border-gray-300 shadow-sm rounded-md">
        <option value="" hidden class="text-light" selected="selected">Select a collection</option>
        <option v-for="option in options" :value="option.id">
          {{ option.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        options: [],
      }
    },
    props: ['optionType'],
    computed: {
      option: {
        get() {
          return this.$store.state.selectedCollection
        },
        set(value) {
          this.$store.commit('setState', {key: 'selectedCollection', value})
        }
      },
    },
    methods: {
      onChangeOption() {
        // Clear results
        this.$store.commit('clearFilters');
        this.$store.commit('setStatus', {key: 'showNoResults', status: false});
        // Set collection to new choice
        this.$store.dispatch('setCollection', this.option);
      },
    },
    async fetch() {
      // Populate select with available collections
      let data = await this.$axios.get(
        "https://vectorai-production-api.azurewebsites.net/project/list_collections",
        {
          params: {
            username: "dummy-collections",
            api_key: "UzdYRktIY0JxNmlvb1NpOFNsenU6VGdTU0s4UjhUR0NsaDdnQTVwUkpKZw"
          }
        }
      ).then(({data}) => data);
      this.$store.commit('setState', {key: 'collections', value: data})
      // Setup collection options
      data.forEach(collection => {
        this.options = [...this.options, {id: collection, name: this.clean(collection)}]
      });
    }
  };
</script>
