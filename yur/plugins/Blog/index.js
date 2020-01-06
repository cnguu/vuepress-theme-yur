import { getPosts, getCategories, getTags } from '@theme/utils'

export default function blog (Vue) {
  Vue.mixin({
    created () {
      Vue.prototype.$posts || (Vue.prototype.$posts = getPosts(this.$site))
      Vue.prototype.$categories || (Vue.prototype.$categories = getCategories(this.$config))
      Vue.prototype.$tags || (Vue.prototype.$tags = getTags(this.$site))
    },
  })
}
