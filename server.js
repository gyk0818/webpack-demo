// 模拟webpack-dev-server
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
// 在node中直接使用webpack
// 在命令行里使用webpack
const complier = webpack(config); // webpack的编译器，传入的参数是webpack配置文件
// app是express的实例
const app = express();
// 使用中间件，接收两个参数
// 意思是 当文件发生改变时，编译器就会重新运行，重新运行生成的文件的publicPath就是config.output.publicPath
app.use(webpackDevMiddleware(complier, {
    publicPath: config.output.publicPath
}));

app.listen(3000, () => {
	console.log('server is running');
});