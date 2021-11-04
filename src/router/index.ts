import config from '@/config'
import storage from '@/utils/storage'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const settings = storage.get('settings', {}) as buildConfig['config']
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    redirect: settings instanceof Object && settings.index === 'markdown' ? '/markdown' : '/settings',
    children: [
      {
        path: '/markdown',
        name: 'markdown',
        component: () => import('@/views/markdown.vue'),
        redirect: `/markdown/${config.indexPath || 'index'}`
      },
      {
        path: '/markdown/:path/',
        props: true,
        name: 'markdownView',
        component: () => import('@/views/markdown.vue')
      },
      {
        path: '/markdown/:path/:name',
        props: true,
        name: 'markdownView2',
        component: () => import('@/views/markdown.vue')
      }
    ]
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/Settings/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
