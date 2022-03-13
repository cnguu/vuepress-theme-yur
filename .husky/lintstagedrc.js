module.exports = {
  '*.{vue,js,jsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,yaml,yml,md,html}': 'prettier --write',
  'package.json': 'sort-package-json',
};
