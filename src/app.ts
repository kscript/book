import { createApp } from 'vue'
import {
  ElRow,
  ElCol
} from 'element-plus'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/scss/base.scss'
export const loadApp = (): void => {
  if (process.env.NODE_ENV === 'development') {
    require('github-markdown-css')
    require('highlight.js/styles/atom-one-dark-reasonable.css')
    require('element-plus/dist/index.css')
  }
  const app = createApp(App)
  const components = [
    ElRow, ElCol
  ]
  components.forEach(component => {
    app.use(component)
  })
  app.use(store).use(router).mount('#app')
}
export default loadApp
