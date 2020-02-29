const install = (Vue, { router }) => {
  router.beforeEach((to, from, next) => {
    if (typeof window === 'undefined') {
      return next()
    }

    next()
  })

  router.afterEach(() => {
    if (typeof window === 'undefined') return
    window.scrollTo(0, 0)
  })
}

export default {
  install,
}
