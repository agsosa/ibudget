const webpack = require("webpack");
const path = require("path");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const supportedLocales = ["en", "es"];

module.exports = {
  entry: path.resolve("./src/index.jsx"),
  mode: "production",
  output: {
    filename: "index.js",
    path: path.resolve("./dist"),
    chunkFilename: "[name].js", ///< Used to specify custom chunk name
  },
  resolve: {
    extensions: [".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, ///< using babel-loader for converting ES6 to browser supported javascript
        loader: "babel-loader",
        exclude: [/node_modules/],
      },
    ],
  },
  webpack: {
    plugins: [
      new webpack.ContextReplacementPlugin(
        /date\-fns[\/\\]/,
        new RegExp(`[/\\\\\](${supportedLocales.join("|")})[/\\\\\]index\.js$`)
      ),
      new WebpackBundleAnalyzer(),
    ],
  },
};
