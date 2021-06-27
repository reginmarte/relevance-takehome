<template>
  <div class="mt-4 text-center">
    <button
      class="mt-3/4 md:w-full p-3 bg-blue-600 hover:bg-blue-500 text-center text-md font-semibold text-white rounded-md"
      @click="handleClick">
      Search Collection
    </button>
  </div>
</template>

<script>
  export default {
    methods: {
      handleClick() {
        if (this.loading || this.disabled) return;
        this.$emit("click");
      }
    }
  }
</script>

<style scoped>
</style>
