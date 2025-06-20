import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuth } from '@/composables/useAuth.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeLayout.vue'),
      children: [
        {
          path: '',
          name: 'ChatHome',
          component: () => import('../views/chat/ChatHome.vue')
        },
        {
          path: '/chat/:chatId',
          name: 'ChatIndex',
          component: () => import('../views/chat/ChatIndex.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginIndex.vue'),
    },
    {
      path: '/error',
      name: 'error',
      children: [
        {
          path: '404',
          name: 'notFound',
          component: () => import('@/views/error/404.vue'),
        },
      ],
    },
    {
      path: '/:path(.*)*',
      redirect: '/error/404', // 路径未找到，则重定向到404页面
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/test/Test.vue'),
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('@/views/test/Demo.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const publicPages = ['/login', '/test','/error/404']
  const {isLogin} = useAuth()

  if (!publicPages.includes(to.path) && !isLogin) {
    return next('/login')
  }

  next()
})

export default router
