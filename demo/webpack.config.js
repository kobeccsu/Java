const path = require("path");
const webpack = require("webpack");
const glob = require('glob');

module.exports = {
  entry: 
  glob.sync('./src/main/resources/static/js/**/*.js').reduce(function(obj, el){
    obj[path.parse(el).name] = el;
    return obj
 },{}),
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/react"]}
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname),
    publicPath: "/src/main/resources/static/dist/js/",
    filename: '[name].js'
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
