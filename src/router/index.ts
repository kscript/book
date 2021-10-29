import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    redirect: '/markdown',
    children: [
      {
        path: '/markdown',
        name: 'markdown',
        component: () => import('@/views/markdown.vue'),
        redirect: '/markdown/index'
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
