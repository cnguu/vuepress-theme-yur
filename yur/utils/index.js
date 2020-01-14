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
