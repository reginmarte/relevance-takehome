<template>
  <div class="px-1 flex flex-col space-y-3 md:space-y-6">

    <!--Search Input-->
    <search-bar/>
    <selection-box/>
    <hr class=" border-0 bg-gray-300 h-px">

    <!--Search Filters-->
    <div v-if="isLoading" class="h-32 flex items-center justify-center">
      <svg class="animate-spin h-6 w-6" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke="gray" stroke-width="5" stroke-dasharray="180"
                stroke-dashoffset="75"></circle>
      </svg>
    </div>

    <div v-else-if="fields && fields.length > 0">
      <!--Fields-->
      <label class="text-sm md:text-lg font-light font-semi">
        Fields<span class="text-red-500">*</span>
      </label>
      <p class="text-xs md:text-sm text-gray-500">
        Select the fields you'd like to include in your search
      </p>
      <multiple-checkbox/>
      <!--Search Weight-->
      <slider minVal="25" maxVal="100"/>
    </div>

  </div>
</template>

<script>
  export default {
    methods: {},
    computed: {
      fields() {
        return this.$store.state.fields
      },
      isLoading() {
        return this.$store.state.status.loadingFields
      }
    },
  }
</script>
