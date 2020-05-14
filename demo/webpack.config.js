const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {policy:"./src/main/resources/static/js/sysadmin/policy.js",
    role:"./src/main/resources/static/js/sysadmin/role.js",
    adminUser:'./src/main/resources/static/js/sysadmin/adminUser.js'},
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/react"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "src/main/resources/static/dist/js/sysadmin/"),
    publicPath: "/src/main/resources/static/dist/js/sysadmin/",
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
