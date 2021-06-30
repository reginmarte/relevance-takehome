<template>
  <div class="p-6" v-if="resultDisplay && resultDisplay.length > 0">
    <!--Results-->
    <p class="md:text-xl text-gray-700 font-light" v-model.lazy="query">Results for "{{ query }}"</p>
    <div class="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
      <div v-for="result in resultDisplay" class="mt-1 h-full space-y-4 mt-3 p-4 bg-white shadow rounded-md ">
        <div v-for="(value, key) in result">
          <p class="text-md md:text-lg font-light overflow-ellipsis overflow-hidden">"{{ value }}"</p>
          <p class="bottom-0 text-sm md:text-md text-gray-700">- {{ key }} </p>
        </div>
      </div>
    </div>
    <pagination/>
  </div>

  <!--Welcome placeholder-->
  <div v-else-if="showWelcome"
       class="md:w-full md:h-screen flex flex-col items-center justify-center p-8 font-light font-semi">
    <p class="text-xl md:text-2xl text-gray-500">
      Welcome to Text Search!</p>
    <p class="mt-2 text-md md:text-lg text-gray-400">
      Select a collection to begin
    </p>
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
      resultDisplay() {
        const {selectedFields, results} = this.$store.state;
        let data = [];
        results.map((result) => {
          let entry = {};
          selectedFields.forEach(({type, value}) => {
            if (type === 'text') {    // only show results for text fields
              if (value.includes('.')) {
                entry[value] = result[keys[0]] && result[keys[0]][keys[1]];
                console.log(keys)
              } else {
                entry[value] = result[value];
              }
            }
            data.push(entry)
          });
        });
        return data
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
