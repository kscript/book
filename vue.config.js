const path = require('path')
module.exports = {
  transpileDependencies: true,
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
  }
}
