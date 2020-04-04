/**
 * This file has no effect on the project and is only used as a WebStorm identifying alias
 * WebStorm preferences -> Language & Framework -> JavaScript -> Webpack
 **/

"use strict";

const resolve = dir => require("path").join(__dirname, dir);

module.exports = {
  resolve: {
    alias: {
      "@theme": resolve("./yur"),
      "@us": resolve("./docs")
    }
  }
};
