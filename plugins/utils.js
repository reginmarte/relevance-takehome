import Vue from 'vue'

Vue.mixin({
  methods: {
    clean(s) {
      s = this.capitalize(s);
      return this.dashToSpace(s)
    },
    dashToSpace(s) {
      return s.replace(/[-_]/g, ' ').trim()
    },
    capitalize(s) {
      return s[0].toUpperCase() + s.slice(1)
    },
  }
});
