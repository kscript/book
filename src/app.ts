import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/scss/base.scss'
export const loadApp = (): void => {
  if (process.env.NODE_ENV === 'development') {
    require('github-markdown-css')
    require('highlight.js/styles/atom-one-dark-reasonable.css')
    require('element-plus/lib/theme-chalk/index.css')
  }
  const app = createApp(App)
  app.use(store).use(router).mount('#app')
}
export default loadApp
