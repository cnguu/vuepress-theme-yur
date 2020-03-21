const path = require("path");

module.exports = {
  base: "/base/",
  evergreen: true,
  theme: path.resolve(__dirname, "../../yur"),
  markdown: {
    lineNumbers: true
  },
  host: "localhost",
  port: 2234,
  dest: "public",
  extraWatchFiles: ["/docs/.vuepress/config.js"]
};
