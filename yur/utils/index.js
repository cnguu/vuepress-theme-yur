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

export function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

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
