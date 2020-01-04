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
 * Determine if an element exists in a two-dimensional array
 * @param arr
 * @param field
 * @param value
 * @returns {boolean}
 */
export function exitItem (arr, field, value) {
  let res = false
  if (arr.length) {
    arr.forEach(item => {
      if (item[field] === value) {
        res = true
      }
    })
  }
  return res
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
 * Get all tags with posts
 * @param siteData
 * @returns {{}}
 */
export function getTags (siteData) {
  const posts = getPosts(siteData)
  const _tags = {}
  if (posts && posts.length) {
    for (const post of posts) {
      const { tags } = post.frontmatter
      for (const tag of tags) {
        if (!hasOwn(_tags, tag)) {
          _tags[tag] = []
        }
        _tags[tag].push(post)
      }
    }
  }
  return _tags
}

/**
 * Get all posts sort by created desc
 * @param siteData
 * @returns {{}}
 */
export function getPosts (siteData) {
  const { pages } = siteData
  let posts = {}
  if (pages && pages.length) {
    posts = pages.filter(page => {
      const { created } = page.frontmatter
      return !(created === undefined)
    })
    posts.sort((a, b) => {
      return new Date(b.frontmatter.created).getTime() - new Date(a.frontmatter.created).getTime()
    })
  }
  return posts
}
