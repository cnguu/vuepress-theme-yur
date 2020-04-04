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
