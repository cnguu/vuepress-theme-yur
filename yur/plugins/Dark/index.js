export default function Dark (Vue) {
  Vue.mixin({
    created () {
      const mode = this.getMode()
      this.$store.dispatch('changeSetting', {
        key: 'mode',
        value: mode,
      })
    },
    methods: {
      getMode () {
        return this.$store.state.settings.mode
      },
    },
  })
}
