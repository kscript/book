const isDev = process.env.NODE_ENV === 'development'
exports.config = {
  // markdown文档首页路由地址 /markdown/${indexPath}
  indexPath: '',
  // markdown文档地址 支持相对路径和绝对路径
  docsPath: isDev ? 'book/' : 'docs/book/',
  // markdown文档的扩展名
  docsExt: '.md',
  // fetch请求基础路径
  baseUrl: isDev ? '/' : '/',
  scripts: [],
  styles: []
}
exports.onBeforeBuild = () => {
  console.log('onBeforeBuild')
}
