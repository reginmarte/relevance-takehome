<template>
  <div class="mt-4 relative">
    <label for="options-select" class="text-md md:text-xl font-light font-semi">
      Collection
    </label>
    <p class="text-sm md:text-md text-gray-500">
      What collection would you like to browse through?
    </p>
    <p class="mt-4 text-sm text-gray-400" v-if="$fetchState.pending">Fetching collections ...</p>
    <p class="mt-4 text-sm text-gray-400" v-else-if="$fetchState.error">An error occurred :(</p>
    <div v-else>
      <select name="options" id="options-select" v-model="option" v-if="options" @change="onChangeOption"
              class="mt-2 w-full focus:ring-blue-300 focus:outline-none py-2 px-3 border-gray-300 shadow-sm rounded-md">
        <option value="" hidden class="text-light" selected="selected">Select a collection</option>
        <option v-for="option in options" :value="option" class="normal-case">
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        options: null,
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
      cleanOptions() {
      }
    },
    methods: {
      onChangeOption() {
        this.$axios.get(
          "https://vectorai-production-api.azurewebsites.net/project/collection_schema",
          {
            params: {
              username: "dummy-collections",
              api_key: "UzdYRktIY0JxNmlvb1NpOFNsenU6VGdTU0s4UjhUR0NsaDdnQTVwUkpKZw",
              collection_name: this.option
            }
          }
        ).then(({data}) => this.setFields(data));
      },
      setFields(fields) {
        console.log("Setting fields");
        let textFields = [];
        let vectorFields = [];

        for (const [key, value] of Object.entries(fields)) {
          if (value === 'text') {
            textFields.push(key)
          } else if (typeof value === 'object') {
            if (value['vector'] && value['vector'] === 512) {
              vectorFields.push(key)
            }
          }
        }

        this.$store.commit('setState', {key: 'textFields', value: textFields});
        this.$store.commit('setState', {key: 'vectorFields', value: vectorFields});

        console.log("fields set!")
      }
    },
    async fetch() {
      let data = ["unsplash-images", "undraw_illustrations", "undraw", "travel_tags", "tafe-scrapped-demo", "tafe-sample-demo", "requested_read_key_storage", "reddit_news_30_days", "realestate-test", "realestate-listings", "realestate-fixed", "realestate", "quora_topics", "quora", "pacmac", "noun_project", "nltk_small", "mirvac_with_attachments", "mirvac-topic-aggregation-1w", "mirvac-topic-aggregation-1d", "mirvac-demo-2020-chunk-2-4_cluster_words_10", "mirvac-demo-2020-chunk-2-4_cluster_words", "mirvac-demo-2020-chunk-2-4_cluster_20", "mirvac-demo-2020-chunk-2-4_cluster_15", "mirvac-demo-2020-chunk-2-4_cluster_10", "mirvac-demo-2020-chunk-2-4-backup-2-5-2021", "mirvac-demo-2020-chunk-2-4", "mirvac-demo-2020-chunk-2-3", "mirvac-demo-2020-chunk-2", "mirvac-demo-2020-chunk", "mirvac-demo-2020", "mirvac-demo", "medium_topics", "major-league-players-new", "major-league-players-2", "major-league-players", "legal-work-codes", "legal-pdf-sample", "legal-effort", "history_global", "freegames3", "food_images", "food_demo_jw_3", "food-recipes-2", "food-recipes", "ecommerce", "domain-listings-raw", "construction_with_attachments", "construction-topic-aggregation-1w", "construction-topic-aggregation-1d", "construction-demo-2020-chunk-2-4_cluster_words_10", "construction-demo-2020-chunk-2-4_cluster_words", "construction-demo-2020-chunk-2-4_cluster_20", "construction-demo-2020-chunk-2-4_cluster_15", "construction-demo-2020-chunk-2-4_cluster_10", "construction-demo-2020-chunk-2-4-backup-2-5-2021", "construction-demo-2020-chunk-2-4", "construction-demo-2020-chunk-2-3", "construction-demo-2020-chunk-2", "construction-demo-2020-chunk", "construction-demo-2020", "construction-demo", "colored_icons", "chemical-engineering", "business_glossary", "book-quotes", "animalkingdomslabelled", "animal-kingdoms", "amazon", "_github_repo_vectorai", "_github_repo_pandas", "_1000_128d_vectors"]
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
      // let cleaned = [];
      // data.forEach((s) => {
      //   cleaned.push(this.cleanString(s));
      // });
      this.options = data ? data : null;
    }
  };
</script>
