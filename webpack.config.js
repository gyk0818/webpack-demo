// 修改webpack配置文件之后要重启服务器
const path = require('path');
// 使用plugin时需要先引入
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  // sourceMap实际上是一个对应关系，它知道dist目录下main.js文件第xx行对应src目录下index.js文件中的第xx行
  // https://webpack.js.org/configuration/devtool/
  // inline: map文件会通过base64的方式写在main.js文件中
  // cheap: 不加cheap会精确到第几行第几列，加cheap只会知道行数
  // module: 不仅关注业务代码，还关注第三方库的代码
  // eval: 通过eval()来生成sourceMap，但是可能不够全面
  // 最佳实践: development eval-cheap-module-source-map  /  production cheap-module-source-map
  devtool: 'eval-cheap-module-source-map',
  // 从哪个文件开始打包
  // entry: './src/index.js',
  entry: {
    // 如果没设置output中的打包文件名，将会以main.js作为打包后的文件名
    main: './src/index.js',
  },
  devServer: {
    // 通过devServer启动的服务器的根路径
    contentBase: './dist',
    // 当运行webpack-dev-server时，会自动打开浏览器进入对应的地址
    open: true,
    // proxy配置 用于跨域
    // Proxying some URLs can be useful when you have a separate API backend development server and you want to send API requests on the same domain.
    proxy: {
      // A request to /api/users will now proxy the request to http://localhost:3000/api/users
      '/api': 'http://localhost:3000'
    },
    // devServer 开启 Hot Module Replacement热模块更新功能
    // HRM 可以只更新页面上的css文件，不影响页面内容
    hot: true,
    // 即便HMR没有生效，也不要让浏览器自动重新刷新
    hotOnly: true
  },
  // 模块打包配置
  module: {
    // 打包规则
    rules: [{
      // 遇到以.jpg结尾的文件，就使用file-loader来进行打包
      test: /\.(jpeg|jpg|png|gif)$/,
      use: {
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
    },{
      test: /\.css$/,
      // css-loader 分析css文件间的引用关系，然后把所有css文件合并成一段css
      // style-loader 在得到css-loader生成的css后，挂载到页面的header部分
      use: ['style-loader', 'css-loader'],
    },{
      test: /\.scss$/,
      // loader的执行顺序是从下到上，从右到左
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            // Enables/Disables or setups number of loaders applied before CSS loader.
            // 通过import引入的css文件，在引入之前也需要走两个loader（sass-loader和postcss-loader
            importLoaders: 2,
            // css模块化引入
            // modules: true
          }
        },
        // 将sass文件转为css文件
        'sass-loader',
        // 添加厂商前缀
        'postcss-loader'
      ]
    },{
      // 字体文件也通过file-loader打包
      test: /\.(eot|ttf|svg|woff)$/,
      use: 'file-loader',
    },]
  },
  // plugin 可以在webpack运行到某个时刻的时候，帮你做一些事情，有点类似于生命周期函数
  // HtmlWebpackPlugin插件会在打包结束后自动生成html文件，并把打包生成的js自动引入到该html文件中
  // CleanWebpackPlugin插件在每次打包前帮助删除文件夹，默认清除output下设置的path路径
  plugins: [new HtmlWebpackPlugin({
    // 指定模板文件
    template: 'src/index.html',
    // watch模式下会删除index.html文件，加入该配置项就可以不删除文件且不影响之前的配置
    cache: false
  }),
  new CleanWebpackPlugin(),
  // HMR插件
  new webpack.HotModuleReplacementPlugin()
  ],
  // 打包文件
  output: {
    // 所有的打包生成的文件的引用前面都加个根路径
    publicPath: '/',
    // 打包好的文件的名字
    // name对应entry对应的key值（当打包生成多个文件时，就不能指定具体的打包名称了）
    filename: '[name].js',
    // 打包出的文件路径，绝对路径
    // __dirname指的是本文件所在目录的路径
    // 将两个参数相结合
    path: path.resolve(__dirname, 'dist'),
    // 会在打包后，html对生成的js文件引用时，路径前面加入该地址
    // publicPath: 'http://cdn.com'
  },
}