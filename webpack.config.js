const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build/")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: "file-loader"
          }
        ]
      },
      {
    test: /\.mp3$/,
    loader: 'file-loader'
},
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true // true outputs JSX tags
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "./")
    ],
    fallback: {
        "fs": false
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
   new Dotenv(".env"),
      // new webpack.DefinePlugin({
      //   'process.env.REACT_APP_ISSUE_TOKEN': JSON.stringify(env.REACT_APP_ISSUE_TOKEN),
      // }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    hot: true,
    open: true
  }
};
