const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode:"development",
  devtool: "cheap-module-eval-source-map",
  entry:"./index.js",             //入口文件
    output:{
        // publicPath: "https://localhost/api/"   //文件的共有域名   会在文件引入的原始位置前添加
        path:__dirname,
        filename:"./release/bundle.js"
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./index.html"
        })
    ],
    module:{
        rules:[{
            test:/\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: "babel-loader"
              }
        },
        {
            test:/\.css|\.less$/,
            exclude: /(node_modules)/,
            use: [
                {loader: "style-loader"},
                {loader: "css-loader"},
                {loader:"less-loader"}
            ]
        }
        ]
    },
    devServer:{
        host:"localhost",
        contentBase:path.join(__dirname,'./release'),
        open:false,
        port:9001
    }
}
