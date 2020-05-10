const path = require("path");
const themeConfig = require("./config/themeConfig");
const plugins = require("./config/plugins");

module.exports = {
  base: "/base/",
  evergreen: false,
  theme: path.resolve(__dirname, "../../yur"),
  themeConfig,
  plugins,
  markdown: {
    lineNumbers: true
  },
  host: "localhost",
  port: 2234,
  dest: "public",
  extraWatchFiles: ["/docs/.vuepress/config.js"]
};
