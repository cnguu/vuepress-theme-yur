import store from '@theme/store'
import { getCurrentPage, getCurrentPost } from '@theme/utils'

const install = (Vue, { router }) => {
  router.beforeEach((to, from, next) => {
    if (typeof window === 'undefined') {
      return next()
    }

    const page = getCurrentPage(to.path)
    const post = getCurrentPost(to.path)
    store.dispatch('changeRoute', {
      key: 'path',
      value: to.path,
    })
    store.dispatch('changeRoute', {
      key: 'page',
      value: page,
    })
    store.dispatch('changeRoute', {
      key: 'post',
      value: post,
    })

    next()
  })

  router.afterEach(() => {
    if (typeof window === 'undefined') return
  })
}

export default {
  install,
}
