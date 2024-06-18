import { createRouter, createWebHistory } from 'vue-router'
import { watch } from 'vue'
import { useAuthStore } from '@/stores/authStore.js'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/dashboard/Details.vue'
import Layout from '@/views/dashboard/Layout.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'

const requireAuth = async (to, from, next) => {
  const authStore = useAuthStore()
  const user = authStore.currentUser()

  if (user) {
    next()
  } else if (authStore.loadingSession) {
    // Wait for session to finish loading
    let unwatch = watch(
      () => authStore.loadingSession,
      loading => {
        if (!loading) {
          // Session has finished loading, check user again
          if (authStore.currentUser()) {
            next()
          } else {
            next('/signin')
          }
          unwatch()
        }
      }
    )
  } else {
    next('/signin')
  }
}

const router = createRouter({
  linkActiveClass: 'text-primary-500 font-bold',
  linkExactActiveClass: 'font-bold',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/signin', name: 'signin', component: LoginView },
    {
      path: '/dashboard/:id',
      name: 'dashboard',
      props: true,
      component: Layout,
      beforeEnter: requireAuth,
      children: [
        {
          path: '',
          name: 'DashboardDetails',
          component: DashboardView
        },
        {
          path: 'edit',
          name: 'DashboardEdit',
          component: () => import('../views/dashboard/Edit.vue')
        }
      ]
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/404/:resource',
      name: '404Resource',
      component: NotFound,
      props: true
    },
    {
      path: '/network-error',
      name: 'NetworkError',
      component: NetworkError
    }
  ]
})

export default router
