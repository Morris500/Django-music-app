import path from "path";

export default {
  entry: "./src/index.js",
  output: {
    path: path.resolve("./static/frontend"),
    filename: "main.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  mode: "development",
};
