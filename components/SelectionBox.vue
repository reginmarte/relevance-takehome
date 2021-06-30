<template>
  <div class="relative">
    <div v-if="$fetchState.pending" class="flex flex-col items-center">
      <div>
        <svg class="animate-spin h-6 w-6" viewBox="0 0 50 50">
          <circle class="path" cx="25" cy="25" r="20" fill="none" stroke="gray" stroke-width="5" stroke-dasharray="180"
                  stroke-dashoffset="75"></circle>
        </svg>
      </div>
      <span class="mt-1 text-sm text-gray-500">Fetching collections ...</span>
    </div>
    <p v-else-if="$fetchState.error" class="text-sm text-gray-400">An error occurred :(</p>
    <div v-else>
      <!--      <p class="pl-1 text-md text-gray-500">-->
<!--      <p class="pl-1 text-md md:text-lg font-light">-->
      <p class="text-sm md:text-md text-gray-500">
        Which collection would you like to search?
      </p>
<!--      </p>-->
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
      // todo: remove this and uncomment API call
      let data = ["unsplash-images", "undraw_illustrations", "undraw", "travel_tags", "tafe-scrapped-demo", "tafe-sample-demo", "requested_read_key_storage", "reddit_news_30_days", "realestate-test", "realestate-listings", "realestate-fixed", "realestate", "quora_topics", "quora", "pacmac", "noun_project", "nltk_small", "mirvac_with_attachments", "mirvac-topic-aggregation-1w", "mirvac-topic-aggregation-1d", "mirvac-demo-2020-chunk-2-4_cluster_words_10", "mirvac-demo-2020-chunk-2-4_cluster_words", "mirvac-demo-2020-chunk-2-4_cluster_20", "mirvac-demo-2020-chunk-2-4_cluster_15", "mirvac-demo-2020-chunk-2-4_cluster_10", "mirvac-demo-2020-chunk-2-4-backup-2-5-2021", "mirvac-demo-2020-chunk-2-4", "mirvac-demo-2020-chunk-2-3", "mirvac-demo-2020-chunk-2", "mirvac-demo-2020-chunk", "mirvac-demo-2020", "mirvac-demo", "medium_topics", "major-league-players-new", "major-league-players-2", "major-league-players", "legal-work-codes", "legal-pdf-sample", "legal-effort", "history_global", "freegames3", "food_images", "food_demo_jw_3", "food-recipes-2", "food-recipes", "ecommerce", "domain-listings-raw", "construction_with_attachments", "construction-topic-aggregation-1w", "construction-topic-aggregation-1d", "construction-demo-2020-chunk-2-4_cluster_words_10", "construction-demo-2020-chunk-2-4_cluster_words", "construction-demo-2020-chunk-2-4_cluster_20", "construction-demo-2020-chunk-2-4_cluster_15", "construction-demo-2020-chunk-2-4_cluster_10", "construction-demo-2020-chunk-2-4-backup-2-5-2021", "construction-demo-2020-chunk-2-4", "construction-demo-2020-chunk-2-3", "construction-demo-2020-chunk-2", "construction-demo-2020-chunk", "construction-demo-2020", "construction-demo", "colored_icons", "chemical-engineering", "business_glossary", "book-quotes", "animalkingdomslabelled", "animal-kingdoms", "amazon", "_github_repo_vectorai", "_github_repo_pandas", "_1000_128d_vectors"]
      // Populate select with available collections
      // let data = await this.$axios.get(
      //   "https://vectorai-production-api.azurewebsites.net/project/list_collections",
      //   {
      //     params: {
      //       username: "dummy-collections",
      //       api_key: "UzdYRktIY0JxNmlvb1NpOFNsenU6VGdTU0s4UjhUR0NsaDdnQTVwUkpKZw"
      //     }
      //   }
      // ).then(({data}) => data);
      // this.$store.commit('setState', {key: 'collections', value: data})

      // Setup collection options
      data.forEach(collection => {
        this.options = [...this.options, {id: collection, name: this.clean(collection)}]
      });
    }
  };
</script>
