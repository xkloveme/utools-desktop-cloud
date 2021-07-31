const CompressionWebpackPlugin = require('compression-webpack-plugin')    //引入插件
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: './', // 此处改为 './' 即可
  outputDir: './dist',
  devServer: {
    host: '0.0.0.0',
    proxy: {
      "/dev": {
        target: "http://127.0.0.1:8079",
        changeOrigin: true,
        pathRewrite: {
          '^/dev': ''
        }
      }
    },
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'async', // 仅提取按需载入的module
        minSize: 20000, // 提取出的新chunk在两次压缩(打包压缩和服务器压缩)之前要大于30kb
        maxSize: 0, // 提取出的新chunk在两次压缩之前要小于多少kb，默认为0，即不做限制
        minChunks: 1, // 被提取的chunk最少需要被多少chunks共同引入
        maxAsyncRequests: 5, // 最大按需载入chunks提取数
        maxInitialRequests: 3, // 最大初始同步chunks提取数
        automaticNameDelimiter: '~', // 默认的命名规则（使用~进行连接）
        name: true,
        cacheGroups: { // 缓存组配置，默认有vendors和default
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    },
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('.(' + ['js', 'css'].join('|') + ')$'),
        threshold: 526,
        deleteOriginalAssets: false
      })
    ]
  },
  // configureWebpack: config => {
  //     // config.plugins.push(new BundleAnalyzerPlugin())
  //     config.plugins.push(
  //       new CompressionWebpackPlugin({
  //         // gzip压缩配置
  //         test: /\.js$|\.html$|\.css/, // 匹配文件名
  //         threshold: 10240, // 对超过10kb的数据进行压缩
  //         deleteOriginalAssets: false // 是否删除原文件
  //       })
  //     )
  //     config.plugins.push(new VuetifyLoaderPlugin())
  // },
  productionSourceMap: false,
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  chainWebpack (config) {

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    if (process.env.NODE_ENV === "production") {
      config.optimization.minimizer("terser").tap(args => {
        // 去除生产环境console
        args[0].terserOptions.compress.drop_console = true
        return args
      })
    }

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                vue: {
                  name: 'chunk-vuejs',
                  test: /[\\/]node_modules[\\/]_?vue(.*)/,
                  priority: 20
                },
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                vuetify: {
                  name: 'chunk-vuetify', // split vuetify into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?vuetify(.*)/ // in order to adapt to cnpm
                },
                commons: { // split async commons chunk
                  name: 'chunk-async-commons',
                  minChunks: 2,
                  priority: 40,
                  chunks: 'async'
                },
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
