const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry:"./src/index.js",             //入口文件
    output:{
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
        open:true,
        port:9000
    }
}