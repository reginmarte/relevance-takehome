<template>
  <div v-if="fields && fields.length > 0" class="mt-2 relative">
    <label for="collection-select" class="text-xs md:text-sm">
      {{ fieldType }}
    </label>
    <hr class="border-0 bg-gray-300 h-px">
    <select multiple name="collections" id="collection-select" v-model="field"
            class="mt-2 w-full focus:ring-blue-300 focus:outline-none py-2 px-3 border-gray-300  rounded-md">
      <option v-for="field in fields" :value="field">
        {{ field }}
      </option>
    </select>
  </div>
</template>

<script>
  export default {
    props: {
      fieldType: String,
      fields: Array,
    },
    computed: {},
  };
</script>
