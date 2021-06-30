import Vue from 'vue'

Vue.mixin({
  methods: {
    clean(s) {
      s = this.capitalize(s);
      s = this.dashToSpace(s);
      return this.dotToDash(s)
    },
    dashToSpace(s) {
      return s.replace(/[-_]/g, ' ').trim()
    },
    capitalize(s) {
      return s[0].toUpperCase() + s.slice(1)
    },
    dotToDash(s) {
      return s.replace(/\./g, ' - ');
    }
  }
});
