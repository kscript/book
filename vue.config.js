const path = require('path')
module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/book/',
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack: {
    externals: process.env.NODE_ENV === 'development' ? {} : {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'highlight.js': 'hljs',
      'markdown-it': 'markdownit'
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
