const GlobalLayout = () => import('../layouts/GlobalLayout.vue')

const install = (Vue, { router }) => {
  const navs = ['/', '/posts/', '/posts/:post', '/tags/', '/tags/:tag', '/timeline/', '/links/', '/about/']
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
    document.getElementById('loading').style.display = 'block'
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
