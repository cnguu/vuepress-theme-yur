module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },
  env: {
    browser: true
  },
  extends: ["prettier", "plugin:vue/essential"],
  plugins: ["vue"],
  globals: {
    ga: true,
    __statics: true,
    process: true,
    chrome: true
  },
  rules: {
    "prefer-promise-reject-errors": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  }
};
