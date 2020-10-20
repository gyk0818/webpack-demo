const path = require('path');

module.exports = {
  mode: 'production',
  // 从哪个文件开始打包
  entry: './src/index.js',
  // 模块打包配置
  module: {
    // 打包规则
    rules: [{
      // 遇到以.jpg结尾的文件，就使用file-loader来进行打包
      test: /\.(jpeg|jpg|png|gif)$/,
      use: {
        // loader: 'file-loader',
        // options: {
        //   // placeholder 占位符
        //   // 打包生成的图片的名称由原先文件名称和原先文件后缀组成
        //   name: '[name]_[hash].[ext]',
        //   // 遇到以.jpg结尾的文件，打包后会放到dist目录下的该路径中
        //   outputPath: 'images/'
        // }

        // url-loader和file-loader不一样，会把图片转变成base64格式存放在main.js文件中，而不是生成一个新的图片文件
        loader: 'url-loader',
        options: {
          // placeholder 占位符
          // 打包生成的图片的名称由原先文件名称和原先文件后缀组成
          name: '[name]_[hash].[ext]',
          // 遇到以.jpg结尾的文件，打包后会放到dist目录下的该路径中
          outputPath: 'images/',
          // 如果图片大小超过204800个字节，就会像file-loader一样，在dist文件夹下生成新的图片文件
          limit: 204800
        }
      }
    }]
  },
  // 打包文件
  output: {
    // 打包好的文件的名字
    filename: 'main.js',
    // 打包出的文件路径，绝对路径
    // __dirname指的是本文件所在目录的路径
    // 将两个参数相结合
    path: path.resolve(__dirname, 'dist')
  }
}