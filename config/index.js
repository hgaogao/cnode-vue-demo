'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path') 

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // '/apis': {
      //   target: 'https://cnodejs.org/api/v1',    //设置你调用的接口域名和端口号
      //   changeOrigin: true,    //true表示允许跨域，有人说false也可以，我没试过
      //   pathRewrite: {
      //     '/apis': ''   //请求接口时直接用/apis = http://123.456.789.123:8081/abc
      //   }
      // }
    },
    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    pwa: {
      workboxPluginMode: 'GenerateSW', // 也可以定义为‘InjectManifest’模式。但是需自己写SW.js文件进行配置
      workboxOptions: {
        importWorkboxFrom: 'cdn', //从''cdn"导入workbox,也可以‘local’
        skipWaiting: true, // 安装完SW不等待直接接管网站
        clientsClaim: true,
        navigateFallback: '/index.html',
        exclude: [/\.(?:png|jpg|jpeg|svg)$/], //在预缓存中排除图片
        // 定义运行时缓存
        runtimeCaching: [
          {
            urlPattern: new RegExp('^https://cdn'),
            handler: 'NetworkFirst',
            options: {
              networkTimeoutSeconds: 20,
              cacheName: 'cdn-cache',
              cacheableResponse: {
                statuses: [200]
              }
            }
          }
        ]
      }
    },
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
