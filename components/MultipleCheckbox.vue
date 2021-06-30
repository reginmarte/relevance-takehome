<template>
  <div class="mt-2">
    <!-- Checkbox group-->
    <div v-if="fields && fields.length > 0"
         class="max-h-24 md:max-h-96 overflow-auto mt-1 px-2 shadow-inner bg-blue-100 border border-blue-200 rounded-md">
      <div class="my-1 px-1">
        <input type="checkbox" class="rounded-md onselect:border-gray-100" v-model="selectAll"
               v-bind:checked="selectAll">
        <span class="pl-1 text-sm md:text-md font-light">Select all</span>
      </div>
      <div v-for="field in fields" class="my-1 md:my-2 pl-3 pr-1">
        <input type="checkbox" class="rounded-md onselect:border-gray-100" v-model="checked" :value="field">
        <span class="pl-1 text-sm md:text-md font-light">{{ field.display }} <span
          class="text-xs md:text-xs text-gray-500">({{ field.type }})</span></span>
      </div>
    </div>
    <!-- Loader-->
    <div v-if="isLoading"
         class="h-28 md:h-40 flex items-center justify-center mt-1 px-2 shadow-inner bg-gray-100 border border-gray-200 rounded-md">
      <svg class="animate-spin h-6 w-6" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke="gray" stroke-width="5" stroke-dasharray="180"
                stroke-dashoffset="75"></circle>
      </svg>
    </div>
    <!-- Placeholder-->
    <div v-else-if="!collection"
         class="h-16 md:h-20 flex items-center justify-center mt-1 px-2 shadow-inner bg-gray-100 border border-gray-200 rounded-md">
      <p class="text-sm font-light text-gray-400">Select a collection to view it's fields</p>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      checked: {
        get() {
          return this.$store.state.selectedFields
        },
        set(value) {
          this.$store.commit('setState', {key: 'selectedFields', value});
        },
      },
      fields() {
        return this.$store.state.fields;
      },
      collection() {
        return this.$store.state.selectedCollection;
      },
      isLoading() {
        return this.$store.state.status.loadingFields;
      },
      selectAll: {
        get() {
          return this.fields.length === this.checked.length;
        },
        set() {
          if (this.selectAll) {
            // De-select all
            this.$store.commit('setState', {key: 'selectedFields', value: []})
          } else {
            // Select all
            this.$store.commit('setState', {key: 'selectedFields', value: this.$store.state.fields})
          }
        }
      }
    },
  }
</script>
