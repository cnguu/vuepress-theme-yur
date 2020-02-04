export default function customer (router, siteData) {
  const { crisp, daoVoice } = siteData.themeConfig
  if (typeof window !== 'undefined') {
    if (crisp) {
      window.$crisp = []
      window.CRISP_WEBSITE_ID = crisp;
      (function () {
        const newChild = document.createElement('script')
        newChild.src = 'https://client.crisp.chat/l.js'
        newChild.async = 1
        document.getElementsByTagName('head')[0].appendChild(newChild)
      })()
    } else if (daoVoice) {
      // (function (i, s, o, g, r, a, m) {
      //   i.DaoVoiceObject = r
      //   i[r] = i[r] || function () {
      //     (i[r].q = i[r].q || []).push(arguments)
      //   }
      //   i[r].l = 1 * new Date()
      //   a = s.createElement(o)
      //   m = s.getElementsByTagName(o)[0]
      //   a.async = 1
      //   a.src = g
      //   m.parentNode.insertBefore(a, m)
      // })(window, document, 'script', `https://widget.daovoice.io/widget/${daoVoice}.js`, 'daovoice')
      // daovoice('init', { app_id: daoVoice })
      // daovoice('update')
      // router.afterEach((to, from) => {
      //   daovoice('update', to.fullPath)
      // })
    }
  }
}
