import HTMLWebpackPlugin from "html-webpack-plugin";

export default function getHtmlConfig(opts) {
  const config = [];
  if (typeof opts !== "object") {
    return config;
  }
  if (Array.isArray(opts)) {
    opts.forEach(opt => {
      config.push(new HTMLWebpackPlugin(opt));
    });
  } else {
    config.push(new HTMLWebpackPlugin(opts));
  }
  return config;
}
