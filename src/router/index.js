import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import { useAuthStore } from '@/stores/authStore.js'

const requireAuth = (to, from, next) => {
  const authStore = useAuthStore()
  const user = authStore.currentUser()
  if (user) {
    next()
  } else {
    next('/signin')
  }
}

const router = createRouter({
  linkActiveClass: 'text-primary-500',
  linkExactActiveClass: 'font-semibold',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/signin', name: 'signin', component: LoginView },
    { path: '/dashboard', name: 'dashboard', component: DashboardView, beforeEnter: requireAuth }
  ]
})

export default router
