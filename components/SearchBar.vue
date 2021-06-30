<template>
  <div class="relative rounded-md">
    <!--    <label for="search" class="mt-2 text-md md:text-xl font-light font-semi">-->
    <!--      Search-->
    <!--    </label>-->
    <!--        <p class="pl-1 text-md md:text-lg text-gray-500">-->
<!--    <p class="text-md md:text-lg font-light text-gray-700">I'd like to search for ...</p>-->
    <div class="pt-2 flex items-center">
      <input type="search" id="search" v-model="query" placeholder="Enter text search"
             class="w-full md:text-lg font-light focus:ring-blue-300 focus:outline-none border-gray-300 shadow-inner rounded-md">
      <button class="ml-2 px-4 py-2 text-center text-md font-semibold shadow rounded-md"
              :disabled="!active"
              :class="{
                'bg-gray-300 text-gray-500 cursor-not-allowed': !active,
                'bg-blue-600 text-white hover:bg-blue-500': active
                }" @click="handleSubmit">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </button>
    </div>
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
          this.$store.commit('clearResults');
          this.$store.commit('setStatus', {key: 'showNoResults', value: false});
          this.$store.commit('setState', {key: 'query', value})
        }
      },
      active() {
        return this.$store.state.query !== '' && this.$store.state.selectedCollection !== ''
      }
    },
    methods: {
      async handleSubmit() {
        this.$store.commit('setStatus', {key: 'loadingResults', status: true});
        this.$store.commit('setStatus', {key: 'showWelcome', value: false});

        const {selectedFields} = this.$store.state;
        let textFields = [];
        let vectorFields = [];

        // Separate text/vector fields
        selectedFields.forEach(({type, value}) => {
          if (type === 'text') {
            textFields.push(value)
          } else if (type === 'vector') {
            vectorFields.push(value)
          }
        });

        // Encode text
        const {vector} = await this.$axios.$post('https://vectorhub-models.westus2.azurecontainer.io/use/encode', {text: this.$store.state.query});
        // Submit search request
        this.$store.dispatch('sendSearchRequest', {vector, textFields, vectorFields});

      }
    },

  };
</script>




