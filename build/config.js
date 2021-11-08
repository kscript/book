const isDev = process.env.NODE_ENV === 'development'
const styles = isDev
  ? []
  : [
      {
        name: 'github-markdown',
        title: 'markdown样式',
        desc: '',
        default: false,
        enable: true,
        path: '/public/css/github-markdown.css'
      },
      {
        name: 'highlight-theme',
        title: '代码高亮主题',
        desc: '',
        default: false,
        enable: true,
        path: '/public/css/atom-one-dark-reasonable.css'
      }
    ]
const scripts = isDev
  ? []
  : [
      {
        name: 'vue',
        title: 'vue3',
        desc: '',
        default: true,
        enable: true,
        path: '/public/js/vue@3.2.20.runtime.global.prod.js'
      },
      {
        name: 'vue-router',
        title: 'vue 路由',
        desc: '',
        default: true,
        enable: true,
        path: '/public/js/vue-router@4.0.12.global.prod.js'
      },
      {
        name: 'vuex',
        title: 'vue 状态管理',
        desc: '',
        default: true,
        enable: true,
        path: '/public/js/vuex@4.0.2.global.prod.js'
      },
      {
        name: 'highlight',
        title: '代码高亮',
        desc: '',
        default: true,
        enable: true,
        path: '/public/js/highlight@11.3.1.min.js'
      },
      {
        name: 'markdown-it',
        title: 'markdown解析',
        desc: '',
        default: true,
        enable: true,
        path: '/public/js/markdown-it@12.2.0.min.js'
      }
    ]
exports.config = {
  index: 'settings',
  // markdown文档首页路由地址 /markdown/${indexPath}
  indexPath: '/markdown/index',
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
