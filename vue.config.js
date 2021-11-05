const path = require('path')
const { onBeforeBuild } = require('./build/config')
// webpack.config.js
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const baseConfig = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/book/',
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    externals: process.env.NODE_ENV === 'development' ? {} : {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'highlight.js': 'hljs',
      'markdown-it': 'markdownit'
      // "element-plus": 'ElementPlus'
    }
  },
  chainWebpack: config => {
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('vue-loader')
      .loader('vue-loader-v16')
      .end()
      .use(path.join(process.cwd() + '/src/loader/markdownLoader.js'))
      .loader(path.join(process.cwd() + '/src/loader/markdownLoader.js'))
      .end()
  },
  devServer: {
    proxy: {
      '/book': {
        target: 'http://localhost:20080',
        changeOrigin: true,
        pathRewrite: {
          '^/book': '/book'
        }
      }
    }
  }
}
const mergedConfig = typeof onBeforeBuild === 'function' ? onBeforeBuild(baseConfig) : baseConfig
module.exports = mergedConfig instanceof Object ? mergedConfig : baseConfig
