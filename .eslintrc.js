module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'standard',
    'plugin:vue/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'dot-notation': [
      'error',
      {
        'allowPattern': '^$',
      },
    ],
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
  },
}
