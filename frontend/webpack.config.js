const path = require("path");
const Webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  optimization: {
    minimize: true,
  },

  plugins: [
    new Webpack.DefinePlugin({
      "process.env":{
        NODE_ENV: JSON.stringify("production"),
      }
    }),
  ],

 
};
