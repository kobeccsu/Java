const path = require("path");
const webpack = require("webpack");
const glob = require('glob');

const entryArray = glob.sync('./src/main/resources/static/js/**/index.js');
const entryObject = entryArray.reduce((acc, item) => {
  const name = item.replace('/index.js', '').replace('/js', '/dist/js');
  acc[name] = item;
  return acc;
}, {});

module.exports = {
  entry: entryObject,
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/(node_modules|bower_components)/, path.resolve(__dirname,'./src/main/resources/static/dist/js/')],
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
    path: process.cwd(),
    //publicPath: "/src/main/resources/static/dist/js/",
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
