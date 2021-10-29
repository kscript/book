import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/scss/base.scss'
import 'github-markdown-css'
import 'highlight.js/styles/atom-one-dark-reasonable.css'

createApp(App).use(store).use(router).mount('#app')
