function extend(to, _from) {
  for (let key in _from) {
    if (_from.hasOwnProperty(key)) {
      to[key] = _from[key];
    }
  }
  return to;
}

export function toObject(arr) {
  const res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}

/**
 * hasOwnProperty() Simplified version
 * @param obj
 * @param key
 * @returns {boolean}
 */
export function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Get category name
 * @param menuCategories
 * @param category
 * @returns {string}
 */
export function getCategoryText(menuCategories, category) {
  let res = "";
  if (menuCategories.length && category) {
    menuCategories.forEach(menuCategory => {
      const { text, link } = menuCategory;
      if (link === category) {
        res = text;
      }
    });
  }
  return res;
}

/**
 * Judge IE browser
 * @returns {boolean}
 */
export function isIE() {
  const bw = window.navigator.userAgent;
  const compare = s => bw.indexOf(s) >= 0;
  const ie11 = (() => "ActiveXObject" in window)();
  return compare("MSIE") || ie11;
}

export function isProd() {
  return process.env.NODE_ENV === "production" && typeof window !== "undefined";
}

export function isBuild() {
  return (
    process.env.NODE_ENV === "production" && typeof navigator === "undefined"
  );
}
