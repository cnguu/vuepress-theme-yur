import Vue from 'vue'

export default () => {
  Vue.mixin({
    components: {},
    data () {
      return {}
    },
    methods: {
      isProd () {
        return process.env.NODE_ENV === 'production' && typeof window !== 'undefined'
      },
      isBuild () {
        return process.env.NODE_ENV === 'production' && typeof navigator === 'undefined'
      },
    },
  })
}
