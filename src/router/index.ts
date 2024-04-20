import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import AboutView from '@/views/AboutView.vue'
import ForgetView from '@/views/ForgetView.vue'
import RegisterView from '../views/RegisterView.vue'
import MainView from '@/views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView
    },
    {
      path: '/forget',
      name: 'forget',
      component: ForgetView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/main',
      name: 'main',
      component: MainView,
      children: [
        {
          path: 'calendar',
          component: () => import('@/views/CalendarView.vue')
        },
        {
          path: 'table',
          component: () => import('@/views/TableView.vue')
        },
        // {
        //   path: 'settings',
        //   component: () => import('@/views/SettingsView.vue')
        // },
        // {
        //   path: 'users',
        //   component: () => import('@/views/UsersView.vue')
        // }
        {
          //默认子路由
          path: '',
          component: () => import('@/views/CalendarView.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'login' }
    }
  ]
})

export default router
