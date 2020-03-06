const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./WebContent/static/js/sysadmin/policy.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "WebContent/static/dist/js/sysadmin/"),
    publicPath: "/WebContent/static/dist/js/sysadmin/",
    filename: "policy.js"
  },
//  devServer: {
//    contentBase: path.join(__dirname, "WebContent/static/"),
//    port: 8080,
//    publicPath: "http://localhost:8080/WebContent/static/dist",
//    hotOnly: true
//  },
  plugins: [
	  new webpack.HotModuleReplacementPlugin()
	]
};
