<template>
  <button
    class="
      py-4
      px-5
      rounded-lg
      font-semibold
      text-center text-xs
      md:text-base
      flex
      items-center
      justify-center
      focus:outline-none
      focus:ring
      ring-blue-300
      transition
    "
    :class="{
      'bg-gray-300 text-gray-500 cursor-not-allowed': disabled,
      'text-white': !disabled,
      'bg-blue-500 cursor-wait': loading,
      'bg-red-600 hover:bg-red-500': error,
      'bg-blue-600 hover:bg-blue-500': !loading && !disabled && !error
    }"
    @click="handleClick"
  >
    <svg
      v-if="loading"
      class="spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      if (this.loading || this.disabled) return;
      this.$emit("click");
    }
  }
};
</script>

<style scoped>
.spin {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  0% {
    transform: rotate(-360deg);
  }
}
</style>
