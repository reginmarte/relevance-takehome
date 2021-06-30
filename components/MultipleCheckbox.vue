<template>
  <div class="mt-2">
    <label class="text-xs md:text-sm font-light font-semi">
      Include:
    </label>
    <div class="h-28 md:h-40 overflow-y-scroll mt-1 px-2 shadow-inner bg-blue-100 border border-blue-200 rounded-md">
      <!--      <div v-if="fields && fields.length > 0">-->
      <div class="my-1 px-1">
        <input type="checkbox" class="rounded-md onselect:border-gray-100" v-model="selectAll" @click="handleSelectAll"
               v-bind:checked="selectAll">
        <span class="pl-1 text-sm md:text-md font-light">Select all</span>
      </div>
      <div v-for="field in fields" class="my-1 pl-3 pr-1">
        <input type="checkbox" class="rounded-md onselect:border-gray-100" v-model="checked" :value="field">
        <span class="pl-1 text-sm md:text-md font-light">{{ field.display }} <span
          class="text-xs md:text-xs text-gray-500">({{ field.type }})</span></span>
      </div>
    </div>
    <!--    </div>-->
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        selectAll: false
      }
    },
    computed: {
      checked: {
        get() {
          return this.$store.state.selectedFields
        },
        set(value) {
          // toggle selectAll if all selected
          this.selectAll = this.fields.length === value.length;
          this.$store.commit('setState', {key: 'selectedFields', value})
        },
      },
      fields() {
        return this.$store.state.fields;
      },
    },
    methods: {
      handleSelectAll() {
        if (this.selectAll) {
          // De-select all
          this.$store.commit('setState', {key: 'selectedFields', value: []})
        } else {
          // Select all
          this.$store.commit('setState', {key: 'selectedFields', value: this.$store.state.fields})
        }
        this.selectAll = !this.selectAll;
      },
    }

  };
</script>
