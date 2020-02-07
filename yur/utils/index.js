/**
 * Simplified hasOwnProperty()
 * @param obj
 * @param key
 * @returns {boolean}
 */
export function hasOwn (obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

/**
 * Knuth-Durstenfeld Shuffle
 * @param arr
 * @returns {*}
 */
export function shuffle (arr) {
  let n = arr.length
  let random
  while (n !== 0) {
    random = (Math.random() * n--) >>> 0;
    [arr[n], arr[random]] = [arr[random], arr[n]]
  }
  return arr
}

export function getCurrentPage (path) {
  let page = '/'
  path = path.split('/')[1]
  if (path) {
    page = path.split('.')[0]
  }
  return page
}

export function getCurrentPost (path) {
  let post = ''
  if (path.split('/').length === 3) {
    path = path.split('/')[2]
  } else {
    path = path.split('/')[1]
  }
  if (path) {
    post = path.split('.')[0]
  }
  return post
}

/**
 * Get Category Name
 * @param navs this.$themeConfig.navs
 * @param category nav.link
 * @returns {string}
 */
export function getCategoryText (navs, category) {
  let res = ''
  if (navs.length && category) {
    navs.forEach(nav => {
      const { text, link } = nav
      if (link && link.split('/')[1] === category) {
        res = text
      }
    })
  }
  return res
}

export function isProd () {
  return process.env.NODE_ENV === 'production' && typeof window !== 'undefined'
}

export function isBuild () {
  return process.env.NODE_ENV === 'production' && typeof navigator === 'undefined'
}
