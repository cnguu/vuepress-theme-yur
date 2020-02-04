import { isProd } from '@theme/utils'

export default function baiDu (router, siteData) {
  const { baiDu } = siteData.themeConfig
  if (isProd() && baiDu) {
    const { tongJi, authPush } = baiDu
    if (tongJi) { // 百度统计
      window._hmt = window._hmt || [];
      (function () {
        const newChild = document.createElement('script')
        const refChild = document.getElementsByTagName('script')[0]
        newChild.src = `https://hm.baidu.com/hm.js?${tongJi}`
        refChild.parentNode.insertBefore(newChild, refChild)
      })()
      router.afterEach(to => {
        window._hmt.push(['_trackPageview', to.fullPath])
      })
    }
    if (authPush) { // 百度自动推送
      (function () {
        const newChild = document.createElement('script')
        const refChild = document.getElementsByTagName('script')[0]
        newChild.src = 'https://zz.bdstatic.com/linksubmit/push.js'
        refChild.parentNode.insertBefore(newChild, refChild)
      })()
    }
  }
}
