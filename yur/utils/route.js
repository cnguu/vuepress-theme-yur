import store from '@theme/store'
import { getCurrentPage, getCurrentPost } from '@theme/utils'

const GlobalLayout = () => import('../layouts/GlobalLayout.vue')

const install = (Vue, { router }) => {
  const navs = ['/', '/posts/', '/posts/:post', '/categories/', '/categories/:category', '/tags/', '/tags/:tag', '/timeline/', '/links/', '/about/', '/search/', '/search/:search']
  const routes = []
  navs.forEach(nav => {
    routes.push({
      name: nav,
      path: nav,
      component: GlobalLayout,
    })
  })
  router.addRoutes(routes)
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
    document.getElementById('loading').style.display = 'flex'
    next()
  })
  router.afterEach(() => {
    if (typeof window === 'undefined') return
    document.getElementById('loading').style.display = 'none'
  })
}

export default {
  install,
}
