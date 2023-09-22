const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/script.js"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "img/[name][ext]",
    clean: true,
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({ extractComments: false }),
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 4200,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|gif|jpg|jpeg|ico|svg)$/,
        type: "asset/resource",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
};
