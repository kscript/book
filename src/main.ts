import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/scss/base.scss'
if (process.env.NODE_ENV === 'development') {
    require('github-markdown.css')
    require('highlight.js/styles/atom-one-dark-reasonable.css')
}

createApp(App).use(store).use(router).mount('#app')
