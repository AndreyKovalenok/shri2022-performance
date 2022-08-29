const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./scripts.js",
  output: {
    path: path.resolve(__dirname, "./docs"),
    filename: "[name].[hash].js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlCriticalWebpackPlugin({
      base: path.resolve(__dirname, "docs"),
      src: "index.html",
      dest: "index.html",
      inline: true,
      minify: true,
      extract: true,
      width: 375,
      height: 565,
      penthouse: {
        blockJSRequests: false,
      },
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin({ parallel: true })],
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(avif)$/,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svgo-loader",
          },
        ],
      },
    ],
  },
};
