"use strict";
const path = require("path");
const host = require("../config/host");

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      "/api": {
        target: host,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
    host: "127.0.0.1",
    port: 8080,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    useEslint: false,
    showEslintErrorsInOverlay: false,
    devtool: "cheap-module-eval-source-map",
    cacheBusting: true,
    cssSourceMap: true,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../dist/index.html"),
    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    productionSourceMap: true,
    devtool: "#source-map",
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],
    bundleAnalyzerReport: process.env.npm_config_report,
  },
};
