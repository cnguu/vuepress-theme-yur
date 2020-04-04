const path = require("path");
const plugins = require("./config/plugins");

module.exports = {
  base: "/base/",
  evergreen: true,
  theme: path.resolve(__dirname, "../../yur"),
  plugins,
  markdown: {
    lineNumbers: true
  },
  host: "localhost",
  port: 2234,
  dest: "public",
  extraWatchFiles: ["/docs/.vuepress/config.js"]
};
