const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
   entry: './src/index.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
   },
   watch: true,
   resolve: {
      extensions: ['.js']
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader' 
         },
         {
            use: ['style-loader', 'css-loader', 'sass-loader'],
            test: /\.(scss|css)$/,
         },
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         inject: true,
         template: './src/index.html',
         filename: './index.html'
      }),
      new MiniCssExtractPlugin(),
      new CopyPlugin({
         patterns: [
           { from: path.resolve(__dirname, 'src', "assets"), to: "assets" },  
           { from: path.resolve(__dirname, 'src', "assets"), to: "assets" }         
         ],
       }),
   ],
}