import { createApp, reactive } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore'
import './assets/styles/base.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

const GStore = reactive({ flashMessage: '' })

createApp(App).use(pinia).use(router).provide('GStore', GStore).mount('#app')

useAuthStore().initAuth()
