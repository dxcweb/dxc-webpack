export default {
  entry: {
    index: "./src/index.js",
    order: "./src/order.js"
  },
  commons: [{ name: "common", minChunks: Infinity }],
  extraBabelPlugins: [
    "transform-decorators-legacy",
    [
      "import",
      { libraryName: "antd-mobile", libraryDirectory: "es", style: true }
    ]
  ],
  html: [
    {
      filename: "index.html",
      template: "./src/index.ejs",
      servicesPrefix: "/app/shop/",
      chunks: ["common", "index"]
    },
    {
      filename: "order/index.html",
      template: "./src/index.ejs",
      servicesPrefix: "/app/shop/",
      chunks: ["common", "order"]
    }
  ],
  env: {
    development: {
      hash: false,
      publicPath: "/",
      extraBabelPlugins: ["dva-hmr"],
      html: [
        {
          filename: "index.html",
          template: "./src/index.ejs",
          servicesPrefix: "/api",
          chunks: ["common", "index"]
        },
        {
          filename: "order/index.html",
          template: "./src/index.ejs",
          servicesPrefix: "/api",
          chunks: ["common", "order"]
        }
      ]
    }
  },
  disableCSSModules: true,
  ignoreMomentLocale: true,
  publicPath: "https://code.tuobacco.com/shop/",
  disableDynamicImport: true,
  hash: true,
  proxy: {
    "/api": {
      target: "http://127.0.0.1:8080/zsy2018/shop/php/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": ""
      }
    }
  }
};
