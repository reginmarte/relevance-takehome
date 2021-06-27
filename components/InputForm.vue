<template>
  <div class="px-3 flex flex-col space-y-60">
    <form action="#" method="POST">
      <selection-box/>

      <div v-if="textFields && textFields.length > 0 && vectorFields && vectorFields.length > 0" class="mt-6">
        <label class="mt-2 text-md md:text-xl font-light font-semi">
          Filter
        </label>
        <p class="text-sm md:text-md text-gray-500">
          Select fields relevant to your search
        </p>
        <select-multiple field-type="TEXT" v-bind:fields="textFields"/>
        <select-multiple field-type="VECTOR" v-bind:fields="vectorFields"/>
      </div>

      <div v-if="false">

        <slider minVal="0" maxVal="10"/>
        <div class="col-span-2">
          <search-bar/>
        </div>
        <search-button/>
      </div>

    </form>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        textFields: this.$store.state.textFields,
        vectorFields: this.$store.state.vectorFields,
      }
    },
    methods: {},
  }
</script>
