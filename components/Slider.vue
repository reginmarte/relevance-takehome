<template>
  <div class="mt-5">

    <label for="weight-slider" class="text-sm md:text-lg font-light font-semi">
      Traditional Search Weight
    </label>
    <p class="text-sm md:text-md text-gray-500">
      Set the weight of traditional texts over vectors in your search
    </p>
    <!--    <p class="mt-2 text-sm md:text-md font-light font-semi">Weight:<span>{{ percent }} %</span></p>-->
    <input id="weight-slider" class="w-full py-2" type="range" v-bind:min="minVal" v-bind:max="maxVal" v-model="weight">
    <div class="-m-2 flex justify-between text-sm text-gray-500">
      <span class="left-0 font-light">Vector</span><span class="right-0 font-light">Text</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      minVal: String,
      maxVal: String,
    },
    computed: {
      weight: {
        get() {
          return this.$store.state.weight * 1000
        },
        set(weight) {
          let value = weight / 1000;    // convert to appropriate scale
          this.$store.commit('setWeight', value)
        }
      },
      percent() {
        // convert to user-friendly percentage
        let percent = ((this.weight - this.minVal) / (this.maxVal - this.minVal)) * 100;
        return Math.round(percent)
      }
    }
  }

</script>

<style scoped>
</style>
