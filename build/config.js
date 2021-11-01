const isDev = process.env.NODE_ENV === 'development'
const styles = isDev
  ? []
  : [
      '/public/css/github-markdown.css',
      '/public/css/atom-one-dark-reasonable.css'
    ]
const scripts = isDev
  ? []
  : [
      '/public/js/vue@3.2.20.runtime.global.prod.js',
      '/public/js/vue-router@4.0.12.global.prod.js',
      '/public/js/vuex@4.0.2.global.prod.js',
      '/public/js/highlight@11.3.1.min.js',
      '/public/js/markdown-it@12.2.0.min.js'
    ]
exports.config = {
  // markdown文档首页路由地址 /markdown/${indexPath}
  indexPath: '',
  // markdown文档地址 支持相对路径和绝对路径
  docsPath: isDev ? 'book/' : 'docs/book/',
  // markdown文档的扩展名
  docsExt: '.md',
  // fetch请求基础路径
  baseUrl: isDev ? '/' : '/',
  // 要加载的脚本
  scripts,
  // 要加载的样式
  styles
}
exports.onBeforeBuild = () => {
  console.log('onBeforeBuild')
}
